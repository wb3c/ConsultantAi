import { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import AddSkillForm from "../components/dashboard/AddSkill";

export default function AddSkill() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="add-skill-home">
      <h2>Frequently Asked Question</h2>
      <p>
        Control how your chatbot responds to frequently asked questions. Import
        automatically from your website.
      </p>
      <div className="buttons">
        <button onClick={() => setIsShow(true)}>
          <AiOutlinePlus />
          Add FAQ
        </button>
        <button className="delete">
          <AiFillDelete />
          Delete all
        </button>
      </div>

      <div className="add-skill-home-body">
        <ul className="add-skill-home-body-top">
          <li>
            {" "}
            <strong>Question</strong>
          </li>
          <li>
            <strong>Answer</strong>
          </li>
          <li>
            <strong>action</strong>
          </li>
        </ul>
        <div className="add-skill-home-body-bottom">
          <ul>
            <li>
              <span>Question 1</span>
            </li>
            <li>
              <span>Answer 1</span>
            </li>
            <li>
              <div className="btns">
                <button>
                  {" "}
                  <AiTwotoneEdit />
                </button>{" "}
                <button className="del">
                  {" "}
                  <AiFillDelete />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <AddSkillForm isShow={isShow} handler={() => setIsShow(false)} />
    </div>
  );
}
