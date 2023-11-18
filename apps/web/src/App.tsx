import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MealPicker from "./pages/MealPicker";
import Configure from "./pages/Configure";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://qtribxnypykjlyjswlno.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cmlieG55cHlramx5anN3bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyNjk4MjQsImV4cCI6MjAxNTg0NTgyNH0.14IgLqK90KonabGozsinPI29MkLWBtkWCffC3NJcSMw")

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<MealPicker />} />
          <Route path="/configure" element={<Configure />} />
        </Route>
        <Route path="/auth" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
