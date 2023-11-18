import React from "react";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <TopBar />

      <main className="flex flex-col flex-1 overflow-y-auto bg-gray-200">
        <Outlet />
      </main>
    </div>
  );
}
