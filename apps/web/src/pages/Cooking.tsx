import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";

export default function Cooking() {
  
  const { recipeID } = useParams();

  function adaptClientData(payload: any) {
    // Adapt the client data here
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const sessionID = getRandomInt(100).toString();

  useEffect(() => {
    const channel = supabase.channel(sessionID);
    // Add a listener until someone joins the session
    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState()
        console.log('sync', newState)
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences)
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('leave', key, leftPresences)
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
