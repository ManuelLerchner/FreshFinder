import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccesfull() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center my-4 gap-10">
      <h1 className="text-3xl font-bold">Order Succesfull</h1>

      <p className="text-lg">Your order has been placed succesfully!</p>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          navigate("/join_session");
        }}
      >
        Order more food
      </button>
    </div>
  );
}
