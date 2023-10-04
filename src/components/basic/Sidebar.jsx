import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineExclamationCircle,
  AiOutlinePlus,
  AiTwotoneMoneyCollect,
} from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BsFacebook, BsMessenger, BsSliders2Vertical } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FiBarChart2 } from "react-icons/fi";
import { GiUpgrade } from "react-icons/gi";
import { LuHome } from "react-icons/lu";
import { PiCirclesThreePlusDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import ThemeContext from "../context/Context";
import Select from "./Select";

export default function Sidebar() {
  const navigate = useNavigate();
  // active chatbot
  const [activeChatbot, setActiveChatbot] = useState();
  const context = useContext(ThemeContext);

  const [menus, setMenus] = useState([
    {
      name: "Dashboard",
      icon: <LuHome />,
      url: "/",
    },
    {
      name: "Appearance",
      icon: <PiCirclesThreePlusDuotone />,
      url: "appearance",
    },
    {
      name: "Try My Chatbot",
      icon: <FiBarChart2 />,
      url: "",
    },
    {
      name: "Captured Contats",
      icon: <AiTwotoneMoneyCollect />,
      url: "/contats",
    },
  ]);

  const menuChatb = [
    {
      name: "Trining Materials",
      icon: <BsSliders2Vertical />,
      url: "training",
    },
    {
      name: "Business Info",
      icon: <AiOutlineExclamationCircle />,
      url: "/",
    },
    {
      name: "FAQs",
      icon: <AiOutlineExclamationCircle />,
      url: "/",
    },
  ];

  useEffect(() => {
    setActiveChatbot(context.activeChatbot);
    const updatedMenus = menus.map((item) => {
      if (item.name === "Try My Chatbot") {
        // Update the URL of the "Try My Chatbot" item
        return {
          ...item,
          url: `mychatbot/${context.activeChatbot._id}/${
            context.activeChatbot.voice || "female"
          }`,
        }; // Replace "/new-url" with your desired URL
      }
      return item;
    });

    setMenus(updatedMenus);
  }, [context]);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <a href="/" className="brand">
          <img src={logo} alt="" />
          <strong>Consultant Ai</strong>
        </a>
        <ul className="sidebar-top-addbtn">
          <strong>{activeChatbot?.name}</strong>
        </ul>
      </div>

      <ul className="sidebar-menu">
        {menus.map((d, i) => (
          <li key={i}>
            <Link to={d.url}>
              {d.icon}
              {d.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-intigration">
        <h4>Chatbot</h4>
        <ul className="sidebar-menu">
          {menuChatb.map((d, i) => (
            <li key={i}>
              <Link to={d.url}>
                {d.icon}
                {d.name}
              </Link>
            </li>
          ))}
          <li>
            <Link className="add-skill" to={"/addskill"}>
              <AiOutlinePlus />
              add Skill
            </Link>
          </li>
          <li>
            <Link className="upgrade" to={"/pricing"}>
              <GiUpgrade />
              Upgrade
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-intigration">
        <h4>Intigrations</h4>
        <ul className="sidebar-intigration-menu">
          <li>
            <button>
              <BsMessenger />
              Connect with messenger
            </button>
          </li>
          <li>
            <button>
              <BsFacebook />
              Connect with facebook
            </button>
          </li>
          <li>
            <button>
              <FcGoogle />
              Connect with google
            </button>
          </li>
        </ul>
      </div>
      <div className="select-language">
        <Select />
      </div>
      <div className="sidebar-bottom">
        <button
          onClick={() => {
            Cookies.remove("loginData");
            navigate("login");
          }}
          className="logout"
        >
          <BiLogIn />
          Logout
        </button>
      </div>
    </div>
  );
}
