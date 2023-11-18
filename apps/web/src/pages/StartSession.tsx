import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localUser, supabase } from "../components/SupabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";


export default function StartSession() {
  // Simple function to log any messages we receive
  function adaptClientData( payload: any) {
   const {uuid, hardPreference, userPreferences} = payload.payload.localUserData
   console.log(payload)
  }

  return (
    <div className="flex flex-col items-center my-4 gap-10">
      <h1 className="text-3xl font-bold">StartSessions</h1>
      <p className="text-lg">Start Session!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          if(supabase.getChannels().length > 0) {
            console.log("Already in a session, leaving session");
            // wait until we are unsubscribed
            supabase.channel('room-1').unsubscribe()
          }
          const channelA = supabase.channel('room-1')
          // Subscribe to the Channel
          channelA
            .on(
              'broadcast',
              { event: 'test' },
              (payload) => adaptClientData(payload)
            )
            .subscribe()
          console.log("Session Started");
        }}
      >
        Start Session
      </button>

      <p className="text-lg">SendMessage!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          const channelB = supabase.channel('room-1')
          channelB.subscribe((status) => {
            if (status !== 'SUBSCRIBED') {
              return null;
            }
            channelB.send({
              type: 'broadcast',
              event: 'test',
              payload: { localUserData: localUser },
            });
          });
          channelB.on(
            'broadcast',
            { event: 'test' },
            (payload) => adaptClientData(payload)
          )
        }}
      >
        Send Message
      </button>
    </div>
  );
}
