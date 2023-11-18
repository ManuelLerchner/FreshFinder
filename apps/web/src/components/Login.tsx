import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <div className="flex flex-col items-center my-4">
        <label className="text-xl font-bold">Username</label>
        <input
          type="text"
          className="border-2 border-gray-500 rounded-lg px-2 py-1"
        />
        <label className="text-xl font-bold">Password</label>
        <input
          type="password"
          className="border-2 border-gray-500 rounded-lg px-2 py-1"
        />
        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg">
          Login
        </button>
      </div>
    </div>
  );
}
