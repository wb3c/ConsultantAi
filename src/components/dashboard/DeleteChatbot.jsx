import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { BsInfoCircle } from "react-icons/bs";
import values from "../../values";
import ThemeContext from "../context/Context";

export default function DeleteChatbot() {
  const context = useContext(ThemeContext);

  const token = Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData")).token
    : null;

  const deleteHandler = () => {
    if (context.activeChatbot && token) {
      alert(
        `Permanently Delete Chatbot: ${context.activeChatbot.name}. Are you sure?`
      );

      axios
        .delete(`${values.url}chatbot`, {
          headers: {
            token,
          },
          data: { id: context.activeChatbot._id }, // Pass the data in the 'data' property
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
  return (
    <div className="delete bg-white">
      <div className="delete-top">
        <BsInfoCircle />
        <h4>Danger Zone</h4>
      </div>
      <div className="delete-body">
        <strong>Permanently Delete Chatbot</strong>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}
