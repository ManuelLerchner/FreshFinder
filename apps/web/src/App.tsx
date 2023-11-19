import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Customize from "./pages/Customize";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/meal-picker" element={<MealPicker />} />
          <Route path="/food-selection" element={<SelectionPage />} />
          <Route path="/cooking/:recipeID" element={<Cooking />} />
          <Route path="/customize/:recipeID" element={<Customize />} />
          <Route path="/join_session" element={<JoinSession />} />
          <Route path="/success" element={<OrderSuccesfull />} />
          <Route path="/cookbook" element={<Cookbook />} />
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
