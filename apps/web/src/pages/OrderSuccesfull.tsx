import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccesfull() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center my-4 gap-10">
      <h1 className="text-3xl font-bold">Order Succesfull</h1>

      <p className="text-lg">Your order has been placed succesfully!</p>

      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">What would you like to do next?</h2>

        <div className="flex flex-row items-center justify-center w-full my-4 gap-10">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
            onClick={() => {
              navigate("/food-selection");
            }}
          >
            Order more food
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
            onClick={() => {
              navigate("/cookbook");
            }}
          >
            View your Cookbook
          </button>
        </div>
      </div>
    </div>
  );
}
