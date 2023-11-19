import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";
import CookingStep from "../components/CookingStep";
import DepenencyGraph, { convertToTree } from "../components/DepenencyGraph";

export default function Cooking() {
  const { ids } = useParams();

  const [finishedSteps, setFinishedSteps] = useState<number[]>([]);
  const [myStep, setMyStep] = useState<number>(-1);
  const [partnerStep, setPartnerMyStep] = useState<number>(-1);
  const [sessionID, setsessionID] = useState<string>("");

  const [recipe, setRecipe] = useState<{
    name: string;
    Steps: string[];
    DependencyGraph: { Dependency: number[][] };
    recipeImages: { images: string[] };
  }>();

  useEffect(() => {
    if (!ids) {
      console.log("No SessionID provided");
      return;
    }
    const splittedIDs = ids.split("_");
    const recipeID = splittedIDs[0];
    const sessionID = splittedIDs[1];
    setsessionID(sessionID);
    const queryFunction = async () => {
      const { data, error } = await supabase
        .from("Recipes")
        .select("*")
        .eq("id", recipeID);

      setRecipe((data as any)[0]);
    };

    queryFunction();
  }, []);

  useEffect(() => {
    if (sessionID && recipe) {
      const channel = supabase.channel(sessionID);
      // Add a listener until someone joins the session
      channel.subscribe((status) => {
        if (status !== "SUBSCRIBED") {
          return null;
        }
        console.log("Requesting Update");
        channel.send({
          type: "broadcast",
          event: "requestUpdate",
          payload: {},
        });
        console.log("Listening for First Updates");
        channel.on("broadcast", { event: "firstUpdate" }, (payload) => {
          console.log("Received first Update");
          const newFinishedSteps: number[] = payload.payload.finishedSteps;
          setFinishedSteps(newFinishedSteps);
          let newMyStep: number = payload.payload.myStep + 1;
          while (newFinishedSteps.includes(newMyStep)) {
            newMyStep = newMyStep + 1;
          }
          if (newMyStep >= recipe.recipeImages.images.length - 1) return;
          setMyStep(newMyStep);
          channel.send({
            type: "broadcast",
            event: "updateSteps",
            payload: { finishedSteps: newFinishedSteps, myStep: newMyStep },
          });
          console.log("Listening for Updates");
          channel.on("broadcast", { event: "updateSteps" }, (payload) => {
            console.log("Received Update");
            updateRecipeSteps(payload);
          });
        });
      });
    }
  }, [recipe]);

  function updateRecipeSteps(payload: any) {
    setFinishedSteps(payload.payload.finishedSteps);
    setPartnerMyStep(payload.payload.myStep);
    if(myStep < 0){
      let myNewStep = getNewStep(payload.payload.finishedSteps)
      setMyStep(myNewStep);
      sendUpdate(sessionID, payload.payload.finishedSteps, myNewStep, updateRecipeSteps);
    }
  }

  function getNewStep(newFinishedSteps: number[]) {
    if(!recipe) return -1;
    console.log("Getting new Step");
    console.log(newFinishedSteps.length);
    console.log(recipe.Steps.length);
    if(newFinishedSteps.length >= recipe.Steps.length) return recipe.Steps.length+1;
    // Check for self dependency and return the step number since it can always be done
    for (let i = 0; i < recipe.DependencyGraph.Dependency.length; i++) {
      if(partnerStep === i || newFinishedSteps.includes(i)) continue;
      if(recipe.DependencyGraph.Dependency[i].length === 1 && recipe.DependencyGraph.Dependency[i][0] === i) {
        if(newFinishedSteps.includes(recipe.DependencyGraph.Dependency[i][0])){
          continue;
        } 
        return i;
      }
    }
    for (let i = 0; i < recipe.DependencyGraph.Dependency.length; i++) {
      if(partnerStep === i|| newFinishedSteps.includes(i)) continue;
      let allDependenciesDone = true;
      for(let j = 0; j < recipe.DependencyGraph.Dependency[i].length; j++){
        if(!newFinishedSteps.includes(recipe.DependencyGraph.Dependency[i][j])){
          allDependenciesDone = false;
          break;
        }
      }
      if(allDependenciesDone) return i;
    }
    console.log("No new Step found");
    return -1;
  }

  return (
    <>
      <div className="h-full flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold">Cooking - SessionID: {sessionID}</h1>

        <div className="h-full flex flex-col items-center justify-around my-2">
          {recipe && (
            <>
              <CookingStep
                step_number={myStep < 0? 'Waiting...' : myStep >= recipe.Steps.length ? 'Finished!' : myStep.toString()}
                description={recipe.Steps[myStep]}
                url={
                  recipe.recipeImages.images[
                    (myStep + 1) % recipe.recipeImages.images.length
                  ]
                }
                onFinished={() => {
                  const newFinishedSteps = [...finishedSteps, myStep];
                  setFinishedSteps(newFinishedSteps);
                  let newMyStep = getNewStep(newFinishedSteps);
                  if(myStep >= recipe.Steps.length) return;
                  setMyStep(newMyStep);
                  if(sessionID ==="") return;
                  sendUpdate(sessionID, newFinishedSteps, newMyStep, updateRecipeSteps);
                }}
                buttonDisabled={myStep >= recipe.Steps.length}
                buttonText={
                  myStep >= recipe.Steps.length
                    ? "Finished!"
                    : "Next Step"
                }
              />
              <div className="max-w-xl w-full flex  flex-col items-center justify-between p-4  rounded-xl bg-white shadow-xl">
                <h1 className="text-2xl font-bold">Roadmap</h1>

                <DepenencyGraph
                  currentStep={myStep}
                  tree={convertToTree(recipe.DependencyGraph.Dependency)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function sendUpdate(sessionID: string, newFinishedSteps: number[], newMyStep: number, updateRecipeSteps: (payload: any) => void) {
  const channel = supabase.channel(sessionID);
  console.log("Sending Update");
  channel.subscribe((status) => {
    if (status !== "SUBSCRIBED") {
      return null;
    }
    channel.send({
      type: "broadcast",
      event: "updateSteps",
      payload: { finishedSteps: newFinishedSteps, myStep: newMyStep },
    });
  });
  console.log("Listening for Updates");
  channel.on(
    'broadcast',
    { event: 'updateSteps' },
    (payload) => { updateRecipeSteps(payload); }
  );
}

