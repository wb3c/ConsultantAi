import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Chatbot from "./Chatbot";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />

        <Route path="*" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/:var1/:name/:voice" element={<Chatbot />} />
    </Routes>
  );
}
