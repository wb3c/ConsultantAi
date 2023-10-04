import { Route, Routes } from "react-router-dom";
import AddSkill from "../pages/AddSkill";
import Addnew from "../pages/Addnew";
import Appearance from "../pages/Appearance";
import ChatbotClient from "../pages/ChatbotClient";
import Contacts from "../pages/Contacts";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Training from "../pages/Training";
import Chatbot from "./Chatbot";
import PrivateRoute from "./PrivateRoute";

export default function Root() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="appearance" element={<Appearance />} />
        <Route path="mychatbot/:id/:voice" element={<ChatbotClient />} />
        <Route path="training" element={<Training />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="addnew" element={<Addnew />} />
        <Route path="addskill" element={<AddSkill />} />
        <Route path="contats" element={<Contacts />} />

        <Route path="*" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/chatbot/:id/:voice" element={<ChatbotClient />} />
      <Route path="/:var1/:name/:voice" element={<Chatbot />} />
    </Routes>
  );
}
