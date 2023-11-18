import React from "react";

export default function TopBar() {
  return (
    <header className="bg-gray-800 text-white px-2 py-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src="/icon/logo.png" className="w-12 h-12 mr-2" alt="logo" />
          <a className="font-bold text-xl" href="/">
            Fresh Finder
          </a>
        </div>
        <div className="flex items-center">
          <a href="/cookbook" className="mr-4">
            My Cookbook
          </a>
          <div className="mr-4">John Doe</div>
        </div>
      </div>
    </header>
  );
}
