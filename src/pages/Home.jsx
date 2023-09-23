import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/basic/Sidebar";
import ThemeContext from "../components/context/Context";
import values from "../values";

export default function Home() {
  const navigate = useNavigate();
  const cookies = Cookies.get("loginData");
  const token = cookies ? JSON.parse(cookies).token : null;
  const [activeChatbot, setActiveChatbot] = useState({});

  useEffect(() => {
    axios
      .get(`${values.url}chatbot/activechatbot`, {
        headers: {
          token: token,
        },
      })
      .then((d) => {
        setActiveChatbot(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <section className="home">
      <ThemeContext.Provider value={activeChatbot}>
        <Sidebar />
        <div className="main-page">
          <Outlet />
        </div>
      </ThemeContext.Provider>
    </section>
  );
}
