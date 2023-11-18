import React from "react";

export default function TopBar() {
  return (
    <header className="bg-gray-800 text-white px-2 py-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <a className="font-bold text-xl" href="/">
            Fresh Finder
          </a>
        </div>
        <div className="flex items-center">
          <div className="mr-4">User</div>
        </div>
      </div>
    </header>
  );
}
