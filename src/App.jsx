import { Routes, Route } from "react-router-dom";
import FormBuilder from "./pages/FormBuilder";
import FormViewer from "./pages/FormViewer";
import Header from "./components/Header";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/build" element={<FormBuilder />} />
      <Route path="/form/:id" element={<FormViewer />} />
    </Routes>
  );
}
