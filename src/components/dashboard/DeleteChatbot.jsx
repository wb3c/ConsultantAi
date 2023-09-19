import { BsInfoCircle } from "react-icons/bs";

export default function DeleteChatbot() {
  return (
    <div className="delete bg-white">
      <div className="delete-top">
        <BsInfoCircle />
        <h4>Danger Zone</h4>
      </div>
      <div className="delete-body">
        <strong>Permanently Delete Chatbot</strong>
        <button>Delete</button>
      </div>
    </div>
  );
}
