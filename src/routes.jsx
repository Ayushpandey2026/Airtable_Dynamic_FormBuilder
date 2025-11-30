// src/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/FormBuilder";
import FormViewer from "./pages/FormViewer";
import ResponsesList from "./pages/ResponsesList";

export default function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/builder" element={<FormBuilder/>} />
        <Route path="/form/:formId" element={<FormViewer/>} />
        <Route path="/forms/:formId/responses" element={<ResponsesList/>} />
      </Routes>
    </BrowserRouter>
  );
}
