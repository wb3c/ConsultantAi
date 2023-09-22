import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/basic/Sidebar";

export default function Home() {
  const navigate = useNavigate();
  const cookies = Cookies.get("loginData");

  const token = cookies ? JSON.parse(cookies).token : null;

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
  });
  return (
    <section className="home">
      <Sidebar />
      <div className="main-page">
        <Outlet />
      </div>
    </section>
  );
}
