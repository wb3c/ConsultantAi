import { AiOutlineDownload } from "react-icons/ai";

export default function Contacts() {
  return (
    <div className="contacts">
      <div className="basic">
        <h2>Captured Contacts</h2>
        <button>
          <AiOutlineDownload />
        </button>
        <button></button>
      </div>
      <div className="contacts-body">
        <ul className="contacts-top">
          <li>
            <strong>Name</strong>
          </li>{" "}
          <li>
            <strong>Email</strong>
          </li>{" "}
          <li>
            <strong>Chatbot</strong>
          </li>
          <li>
            <strong>Date</strong>
          </li>
        </ul>
        <ul className="contacts-bottom">
          <li>
            <span>Harun</span>
          </li>
          <li>
            <span>harun@gamil.com</span>
          </li>
          <li>
            <span>Chatbot1</span>
          </li>
          <li>
            <span>12-10-2023</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
