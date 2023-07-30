import { Route, Routes } from "react-router-dom";
import Chatbot from "./Chatbot";

export default function Root() {
  return (
    <Routes>
      <Route path="/:var1/:name/:voice" element={<Chatbot />} />
    </Routes>
  );
}
