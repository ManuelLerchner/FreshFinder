import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localUser, supabase } from "../components/SupabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";


export default function JoinSession() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // Simple function to log any messages we receive
  function adaptClientData( payload: any) {
   const {uuid, hardPreference, userPreferences} = payload.payload.localUserData
   console.log(payload)
  }

  return (
    <div className="flex flex-col items-center my-4 gap-10">
      <h1 className="text-3xl font-bold">Join Session</h1>

      <input
        type="text"
        className="border-2 border-gray-500 rounded-lg px-2 py-1"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        defaultValue={Math.random()}
        placeholder="Enter Session ID"
      />

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          const channel = supabase.channel(username)
          // channel.subscribe((status) => {
          //   if (status !== 'SUBSCRIBED') {
          //     return null;
          //   }
          //   channel.send({
          //     type: 'broadcast',
          //     event: 'test',
          //     payload: { localUserData: localUser },
          //   });
          // });
          channel.on(
            'broadcast',
            { event: 'test' },
            (payload) => adaptClientData(payload)
          ).subscribe()
        }}
      >
        Join Session...
      </button>
    </div>
  );
}
