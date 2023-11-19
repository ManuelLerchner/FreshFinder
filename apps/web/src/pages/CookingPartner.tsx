import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";
import CookingStep from "../components/CookingStep";
import DepenencyGraph, { convertToTree } from "../components/DepenencyGraph";

export default function Cooking() {
  const { ids } = useParams();

  const [finishedSteps, setFinishedSteps] = useState<number[]>([]);
  const [myStep, setMyStep] = useState<number>(0);
  const [partnerStep, setPartnerMyStep] = useState<number>(0);
  const [sessionID, setsessionID] = useState<string>("");

  const [recipe, setRecipe] = useState<{
    name: string;
    Steps: string[];
    DependencyGraph: { Dependency: number[][] };
    recipeImages: { images: string[] };
  }>();

  useEffect(() => {
    if(!ids){
      console.log("No SessionID provided")
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

    queryFunction()
    
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
          channel.on(
            'broadcast',
            { event: 'firstUpdate' },
            (payload) => {
              console.log("Received first Update");
              const newFinishedSteps : number[] = payload.payload.finishedSteps;
              setFinishedSteps(newFinishedSteps);
              let newMyStep : number = payload.payload.myStep +1;
              while (newFinishedSteps.includes(newMyStep)) {
                newMyStep = newMyStep + 1;
              }
              if(newMyStep >= recipe.recipeImages.images.length - 1) return;
              setMyStep(newMyStep);
              channel.send({
                type: "broadcast",
                event: "updateSteps",
                payload: { finishedSteps: newFinishedSteps, myStep: newMyStep },
              });
              console.log("Listening for Updates");
              channel.on(
                'broadcast',
                { event: 'updateSteps' },
                (payload) => {
                  console.log("Received Update");
                  updateRecipeSteps(payload)
                },
              );
            },
          );
        });
      }
    }, [recipe]);
  

  function updateRecipeSteps( payload:any) {
    setFinishedSteps(payload.payload.finishedSteps);
    setPartnerMyStep(payload.payload.myStep);
  }

  return (
    <>
      <div className="h-full flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold">
          Cooking - SessionID: {sessionID}
        </h1>

        <div className="h-full flex flex-col items-center justify-center my-2">
          {recipe && (
            <>
              <CookingStep
                step_number={myStep}
                description={recipe.Steps[myStep]}
                url={
                  recipe.recipeImages.images[
                    (myStep + 1) % recipe.recipeImages.images.length
                  ]
                }
                onFinished={() => {
                  const newFinishedSteps = [...finishedSteps, myStep];
                  setFinishedSteps(newFinishedSteps);
                  let newMyStep = myStep + 1;
                  while (newFinishedSteps.includes(newMyStep) || newMyStep == partnerStep) {
                    newMyStep = newMyStep + 1;
                  }
                  if(myStep >= recipe.recipeImages.images.length - 1) return;
                  setMyStep(newMyStep);
                  if(sessionID ==="") return;
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
                    (payload) => {updateRecipeSteps(payload)},
                  );
                }}
                buttonDisabled={myStep >= recipe.recipeImages.images.length - 1}
                buttonText={
                  myStep >= recipe.recipeImages.images.length - 1
                    ? "Finished!"
                    : "Next Step"
                }
              />
              <DepenencyGraph
                tree={convertToTree(recipe.DependencyGraph.Dependency)}
                currentStep={myStep}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
