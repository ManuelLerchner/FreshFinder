import React from "react";

export default function TopBar() {
  return (
    <header className="bg-gray-800 text-white px-2 py-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <a className="flex flex-row items-center font-bold text-xl" href="/">
            <img src="/icon/logo.png" className="w-12 h-12" alt="logo" />
            Fresh Finder
          </a>
        </div>
        <div className="flex items-center">
          <a href="/cookbook" className="mr-4 underline font-semibold">
            My Cookbook
          </a>

          <div className="flex flex-row items-center">
            <div
              className="mr-4
            bg-gray-700 rounded-full p-2 flex items-center justify-center
            "
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                className="w-6 h-6"
                alt="profile"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
