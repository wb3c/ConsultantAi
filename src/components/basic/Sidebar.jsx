import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BsSliders2Vertical } from "react-icons/bs";
import { FiBarChart2 } from "react-icons/fi";
import { GiUpgrade } from "react-icons/gi";
import { LuHome } from "react-icons/lu";
import { PiCirclesThreePlusDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

export default function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: <LuHome />,
      url: "/",
    },
    {
      name: "Appearance",
      icon: <PiCirclesThreePlusDuotone />,
      url: "/",
    },
    {
      name: "Try My Chatbot",
      icon: <FiBarChart2 />,
      url: "/",
    },
    {
      name: "Trining Materials",
      icon: <BsSliders2Vertical />,
      url: "/",
    },
    {
      name: "Business Info",
      icon: <AiOutlineExclamationCircle />,
      url: "/",
    },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <a href="/" className="brand">
          <img src={logo} alt="" />
          <strong>Consultant Ai</strong>
        </a>
        <ul className="select">
          <li>Chatbot name</li>
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
        <li>
          <Link className="upgrade" to={"/pricing"}>
            <GiUpgrade />
            Upgrade
          </Link>
        </li>
      </ul>
      <div className="sidebar-bottom">
        <button className="logout">
          <BiLogIn />
          Logout
        </button>
      </div>
    </div>
  );
}