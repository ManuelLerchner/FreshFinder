import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MealPicker from "./pages/MealPicker";
import Configure from "./pages/Configure";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/configure" element={<Configure />} />
          <Route path="/mealPicker" element={<MealPicker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
