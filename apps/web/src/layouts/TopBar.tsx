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
        <div className="flex items-between">
          <div className="flex items-center">
            <a
              href="/join_session"
              className="underline font-semibold flex-row flex gap-1"
            >
              Join Session
              <img
                src="https://www.svgrepo.com/show/304494/session-join.svg"
                className="w-6 h-6"
                style={{ filter: "invert(1)" }}
                alt="profile"
              />
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <a
            href="/cookbook"
            className="underline font-semibold flex-row flex gap-1 mr-4"
          >
            My Cookbook
            <img
              src="https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png"
              className="w-6 h-6"
              style={{ filter: "invert(1)" }}
              alt="profile"
            />
          </a>

          <div className="flex flex-row items-center">
            <a
              className="mr-4
            bg-gray-700 rounded-full p-2 flex items-center justify-center cursor-pointer
            "
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
                className="w-6 h-6"
                alt="profile"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
