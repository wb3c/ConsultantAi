import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DarkMode from "../components/basic/DarkMode";
import Sidebar from "../components/basic/Sidebar";
import ThemeContext from "../components/context/Context";
import values from "../values";

export default function Home() {
  const cookies = Cookies.get("loginData");
  const token = cookies ? JSON.parse(cookies).token : null;
  const [activeChatbot, setActiveChatbot] = useState({});

  const [isDark, setIsDark] = useState(false);

  const chatbotUrl = `${values.fontEndUrl}/chatbot/${activeChatbot._id}/${
    activeChatbot.voice || "female"
  }`;

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
    <section className={`home ${(isDark && "dark") || ""}`}>
      <DarkMode setIsDark={setIsDark} isDark={isDark} />
      <ThemeContext.Provider value={{ activeChatbot, chatbotUrl }}>
        <Sidebar />
        <div className="main-page">
          <Outlet />
        </div>
      </ThemeContext.Provider>
    </section>
  );
}
