import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";

export default function Cooking() {
  
  const { recipeID } = useParams();

  function adaptClientData(payload: any) {
    // Adapt the client data here
       
  }

  function startSynchronisation() {
    const channel = supabase.channel(sessionID);
    channel.subscribe((status) => {
            if (status !== 'SUBSCRIBED') {
              return null;
            }
            channel.send({
              type: 'broadcast',
              event: 'updateSteps',
              payload: { recipeID: recipeID },
            });
          });
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const sessionID = getRandomInt(100).toString();

  useEffect(() => {
    const channel = supabase.channel(sessionID);
    // Add a listener until someone joins the session
    channel
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        startSynchronisation();
      })
      .subscribe()
  }, []);

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold"> Start Cooking -  SessionID: {sessionID}</h1>
      </div>
    </>
  );
}
