import Cookies from "js-cookie";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BsSliders2Vertical } from "react-icons/bs";
import { FiBarChart2 } from "react-icons/fi";
import { GiUpgrade } from "react-icons/gi";
import { LuHome } from "react-icons/lu";
import { MdAddCircle } from "react-icons/md";
import { PiCirclesThreePlusDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

export default function Sidebar() {
  const navigate = useNavigate();
  const menus = [
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
      url: "mychatbot",
    },
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
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <a href="/" className="brand">
          <img src={logo} alt="" />
          <strong>Consultant Ai</strong>
        </a>
        <ul className="sidebar-top-addbtn">
          <Link to="addnew">
            <MdAddCircle /> Create new chatbot
          </Link>
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
