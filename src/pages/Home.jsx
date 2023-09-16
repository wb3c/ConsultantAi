import { Outlet } from "react-router-dom";
import Sidebar from "../components/basic/Sidebar";

export default function Home() {
  return (
    <section className="home">
      <Sidebar />
      <div className="main-page">
        <Outlet />
      </div>
    </section>
  );
}
