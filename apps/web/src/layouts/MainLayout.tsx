import React from "react";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />

      <main className="flex flex-col flex-1 bg-gray-200 px-4">
        <Outlet />
      </main>
    </div>
  );
}
