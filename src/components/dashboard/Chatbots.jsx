import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import values from "../../values";
import ThemeContext from "../context/Context";

export default function Chatbots() {
  const [chatbots, setChatbots] = useState([]);
  const [activeChatbot, setActiveChatbot] = useState({});
  const context = useContext(ThemeContext);

  const [show, setShow] = useState({
    pre: 0,
    next: 4,
  });

  useEffect(() => {
    setActiveChatbot(context.activeChatbot);
  }, [context]);

  const user = Cookies.get("loginData") && JSON.parse(Cookies.get("loginData"));
  const navigate = useNavigate();

  const truncateString = (inputString, maxWords = 40) => {
    const words = inputString.split(" ");

    if (words.length > maxWords) {
      words.length = maxWords;
      return words.join(" ") + "...";
    }

    return inputString;
  };

  useEffect(() => {
    axios
      .get(`${values.url}chatbot`, {
        headers: {
          token: user.token,
        },
      })
      .then((d) => {
        if (!d.data.length) {
          navigate("/addnew");
        } else {
          setChatbots(d.data);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const activeChatbotHandler = (chatbotId) => {
    axios
      .put(
        `${values.url}chatbot/activechatbot`,
        { chatbotId },
        {
          headers: {
            token: user?.token,
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <div className="chatbots bg-white">
      <div className="chatbots-top">
        <FiUsers /> <h4>Other Chatbots</h4>
      </div>
      <div className="chatbots-body">
        <Link className="add-new-chatbot item" to="/addnew">
          <AiOutlinePlus />
          add new
        </Link>

        {chatbots.slice(show.pre, show.next).map((d) => (
          <Link
            onClick={() => activeChatbotHandler(d._id)}
            key={d._id}
            to="/"
            className={`item ${
              (d._id === activeChatbot._id && "active") || ""
            }`}
          >
            <h5>{d.name}</h5>
            <p>{truncateString(d.matarials)}</p>
          </Link>
        ))}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setShow({ pre: show.pre - 4, next: show.next - 4 });
          }}
          disabled={show.pre === 0}
        >
          previous
        </button>
        <button
          onClick={() => {
            setShow({ pre: show.pre + 4, next: show.next + 4 });
          }}
          disabled={show.next >= chatbots.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
