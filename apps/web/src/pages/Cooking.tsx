import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";
import CookingStep from "../components/CookingStep";
import DepenencyGraph, { convertToTree } from "../components/DepenencyGraph";
import Customize from "../components/Customize";

export default function Cooking() {
  const { recipeID } = useParams();

  const [customizeView, setCustomizeView] = useState<boolean>(false);

  const [finishedSteps, setFinishedSteps] = useState<number[]>([]);
  const [myStep, setMyStep] = useState<number>(0);
  const [partnerStep, setPartnerMyStep] = useState<number>(-1);
  const [sessionID, setSessionID] = useState<string>("");

  const [recipe, setRecipe] = useState<{
    name: string;
    Steps: string[];
    DependencyGraph: { Dependency: number[][] };
    recipeImages: { images: string[] };
  }>();

  useEffect(() => {
    const queryFunction = async () => {
      const { data, error } = await supabase
        .from("Recipes")
        .select("*")
        .eq("id", recipeID);

      setRecipe((data as any)[0]);
    };

    queryFunction();
    const sessionIDTemp = getRandomInt(100).toString();
    setSessionID(sessionIDTemp);
    console.log("Started SessionID: ", sessionIDTemp);
    const channel = supabase.channel(sessionIDTemp);
    // Add a listener until someone joins the session
    channel
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log("Recognized Partner")
        // add delay to make sure that the partner is ready
        startSynchronisation(sessionIDTemp);
      })
      .subscribe();
  }, []);

  function updateFirstRequest(sessionIDTemp: string): void {
    console.log("Send current Configuration");
    const channel = supabase.channel(sessionIDTemp);
    channel.subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
      channel.send({
        type: "broadcast",
        event: "firstUpdate",
        payload: { finishedSteps: finishedSteps, myStep: myStep },
      });
    });
    console.log("Listening for Updates");
    channel.on(
      'broadcast',
      { event: 'updateSteps' },
      (payload) => {updateRecipeSteps(payload)},
    );
  }
  
  function updateRecipeSteps( payload:any) {
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

  function startSynchronisation(sessionIDTemp: string) {
    const channel = supabase.channel(sessionIDTemp);
    console.log("Starting Synchronisation with SessionID: ", sessionIDTemp);
    channel.subscribe((status) => {
      if (status !== "SUBSCRIBED") {
        return null;
      }
      channel.send({
        type: "broadcast",
        event: "updateRecipe",
        payload: { recipeID: recipeID },
      });
    });
    channel.on(
      'broadcast',
      { event: 'requestUpdate' },
      (payload) => {updateFirstRequest(sessionIDTemp)},
    );
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="h-full flex flex-col items-ce nter my-4">
        <div className="h-full flex flex-col items-center justify-center my-2">
          {customizeView && recipeID && (
            <Customize
              recipeID={recipeID}
              recipeCallback={(s) => {
                setRecipe((old) => {
                  return { ...old, ...s.Steps };
                });
                setCustomizeView(false);
              }}
            />
          )}

          {!customizeView && recipe && (
            <div className="flex flex-col h-full justify-around items-center">
              <h1 className="text-2xl font-bold">
                Start Cooking - SessionID: {sessionID}
              </h1>
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
                  console.log("Setting my Step to: ", newMyStep);
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
            </div>
          )}
        </div>

        <button
          className="btn btn-primary self-end"
          onClick={() => {
            setCustomizeView(!customizeView);
          }}
        >
          {customizeView ? "Hide" : "Customize"}
        </button>
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
