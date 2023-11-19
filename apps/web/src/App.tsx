import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MealPicker from "./pages/MealPicker";
import Configure from "./pages/Configure";
import Login from "./pages/Login";
import { createClient } from "@supabase/supabase-js";
import SelectionPage from "./pages/SelectionPage";
import Cooking from "./pages/Cooking";
import OrderSuccesfull from "./pages/OrderSuccesfull";
import JoinSession from "./pages/JoinSession";
import Cookbook from "./pages/Cookbook";
import CookingPartner from "./pages/CookingPartner";

function App() {
  return (
    <BrowserRouter basename={"/FreshFinder/"}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/food-selection" />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/meal-picker" element={<MealPicker />} />
          <Route path="/food-selection" element={<SelectionPage />} />
          <Route path="/cooking/:recipeID" element={<Cooking />} />
          <Route path="/cooking-partner/:ids" element={<CookingPartner />} />
          <Route path="/join_session" element={<JoinSession />} />
          <Route path="/success" element={<OrderSuccesfull />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center my-4">
                <h1 className="text-2xl font-bold">404</h1>
                <h2 className="text-xl font-bold">Page not found</h2>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
