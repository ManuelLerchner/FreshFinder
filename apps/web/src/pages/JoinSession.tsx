import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localUser, supabase } from "../components/SupabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";

export default function JoinSession() {

  const navigate = useNavigate();
  const [sessionID, setsessionID] = useState("");
  const [recipeID, setrecipeID] = useState("");


  // Simple function to log any messages we receive
  function updateRecipeSteps( payload: any) {
    setrecipeID(payload.recipeID)
    console.log("Received new RecipeID: ", recipeID)
    navigate("/cooking/" + recipeID);
  }

  return (
    <div className="flex flex-col items-center my-4 gap-10">
      <h1 className="text-3xl font-bold">Join Session</h1>

      <input
        type="text"
        className="border-2 border-gray-500 rounded-lg px-2 py-1"
        value={sessionID}
        onChange={(e) => setsessionID(e.target.value)}
        placeholder="Enter Session ID"
      />

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          console.log("Joining session: ", sessionID);
          const channel = supabase.channel(sessionID)
          // add on presence listener
          const userStatus = {
            cmd: 'RequestUpdateSteps',
          }
          channel.subscribe(async (status) => {
            if (status !== 'SUBSCRIBED') { return }
             await channel.track(userStatus)
          })
          channel.on(
            'broadcast',
            { event: 'updateSteps' },
            (payload) => updateRecipeSteps(payload)
          )
        }}
      >
        Join Session...
      </button>
    </div>
  );
}
