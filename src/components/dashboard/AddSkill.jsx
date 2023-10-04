import { AiOutlineClose } from "react-icons/ai";

export default function AddSkillForm({ isShow, handler }) {
  return (
    <div className={`add-skill-form ${(isShow && "show") || ""}`}>
      <div className="add-skill-form-top">
        <h4>Add Skill</h4>
        <button onClick={() => handler()}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="form-group">
        <label htmlFor="">Question</label>
        <input type="text" />
      </div>{" "}
      <div className="form-group">
        <label htmlFor="">Answer</label>
        <textarea name="" id=""></textarea>
      </div>
      <button className="btn">add</button>
    </div>
  );
}
