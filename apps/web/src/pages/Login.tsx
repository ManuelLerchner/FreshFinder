import React, { useState } from "react";
import { supabase, localUser } from "../components/SupabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Write Login Code here using the Supabase Client
    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    if (error) console.error(error)
    else {
      console.log("logged in");
      // set localUser uuid
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if(user && user.id) {
        localUser.uuid = user.id;
        const { data : preferencesData } = await supabase
          .from("Users")
          .select("hardPreference")
          .eq("id", localUser.uuid)
        if (preferencesData && preferencesData.length > 0) {
          console.log("preferencesData: ", preferencesData[0].hardPreference.Tags);
          localUser.hardPreferences = preferencesData[0].hardPreference.Tags;
        } else {
          console.error("Could not retrieve preferences");
        }
        navigate("/configure");
      } else 
        console.error("Could not retrieve UUID");
    }
  };

  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <div className="flex flex-col items-center my-4">
        <label className="text-xl font-bold">Username</label>
        <input
          type="text"
          className="border-2 border-gray-500 rounded-lg px-2 py-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-xl font-bold">Password</label>
        <input
          type="password"
          className="border-2 border-gray-500 rounded-lg px-2 py-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
