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
  const [partnerStep, setPartnerMyStep] = useState<number>(0);
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
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("Recognized Partner");
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
    channel.on("broadcast", { event: "updateSteps" }, (payload) => {
      updateRecipeSteps(payload);
    });
  }

  function updateRecipeSteps(payload: any) {
    setFinishedSteps(payload.payload.finishedSteps);
    setPartnerMyStep(payload.payload.myStep);
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
    channel.on("broadcast", { event: "requestUpdate" }, (payload) => {
      updateFirstRequest(sessionIDTemp);
    });
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return (
    <>
      <div className="h-full flex flex-col items-center my-4">
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
                  while (
                    newFinishedSteps.includes(newMyStep) ||
                    newMyStep == partnerStep
                  ) {
                    newMyStep = newMyStep + 1;
                  }
                  if (myStep >= recipe.recipeImages.images.length - 1) return;
                  setMyStep(newMyStep);
                  if (sessionID === "") return;
                  const channel = supabase.channel(sessionID);
                  console.log("Sending Update");
                  channel.subscribe((status) => {
                    if (status !== "SUBSCRIBED") {
                      return null;
                    }
                    channel.send({
                      type: "broadcast",
                      event: "updateSteps",
                      payload: {
                        finishedSteps: newFinishedSteps,
                        myStep: newMyStep,
                      },
                    });
                  });
                  console.log("Listening for Updates");
                  channel.on(
                    "broadcast",
                    { event: "updateSteps" },
                    (payload) => {
                      updateRecipeSteps(payload);
                    }
                  );
                }}
                buttonDisabled={myStep >= recipe.recipeImages.images.length - 1}
                buttonText={
                  myStep >= recipe.recipeImages.images.length - 1
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
