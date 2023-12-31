import { useContext } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Copylink from "../basic/CopyLInk";
import ThemeContext from "../context/Context";

export default function AddWebsite() {
  const context = useContext(ThemeContext);

  return (
    <div className="addwebsite bg-white">
      <div className="addwebsite-top">
        <BsCodeSlash />
        <h4>Statistics</h4>
      </div>
      <div className="addwebsite-body">
        <p>
          <b> Warning:</b> Your chatbot is on our FREE PLAN and has a message
          limit of 25 credits. Once used, your chatbot will stop responding to
          customers 24/7.{" "}
          <Link to="/">
            <b>Upgrade your plan</b>
          </Link>{" "}
          for more message credits.
        </p>
        <Copylink link={context.chatbotUrl} />
      </div>
    </div>
  );
}
