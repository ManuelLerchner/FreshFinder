import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";


export default function StartSession() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center my-4 gap-10">
      <h1 className="text-3xl font-bold">StartSessions</h1>

      <p className="text-lg">Start Session!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          const roomOne = supabase.channel('room1') // set your topic here
          // navigate("/meal-picker");
        }}
      >
        Start Session
      </button>
      <p className="text-lg">Join Session!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          const channel = supabase.channel('room1')
          channel
            .on('presence', { event: 'sync' }, () => {
              console.log('Synced presence state: ', channel.presenceState())
            })
            .subscribe(async (status) => {
              if (status === 'SUBSCRIBED') {
                await channel.track({ online_at: new Date().toISOString() })
              }
            })
          // navigate("/meal-picker");
        }}
      >
        Join Session!
      </button>
    </div>
  );
}
