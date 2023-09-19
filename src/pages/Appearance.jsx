import Chatbot from "../components/Chatbot";
import Color from "../components/Color";

export default function Appearance() {
  return (
    <div className="appearance">
      <div className="container">
        <div className="appearance-wrp">
          <form className="appearance-form">
            <h1 className="title">Appearance</h1>
            <div className="appearance-form-top">
              <strong>Chat Mode Settings</strong>
              <button type="submit" className="btn">
                Save Changes
              </button>
            </div>
            <div className="form-inner">
              <div className="form-group">
                <label htmlFor="">Chatbot Title</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label htmlFor="">Agent Name</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-inner">
              <div className="form-group">
                <label htmlFor="">Welcome Message</label>
                <textarea name="" id=""></textarea>
              </div>
            </div>

            <div className="form-inner">
              <div className="form-group">
                <span className="color-box">
                  <Color />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="">Profile Avatar</label>
                <input type="file" name="" id="" accept="image/*" />
              </div>
            </div>

            <button type="submit" className="btn">
              Save Changes
            </button>
          </form>
          <div className="appearance-preview">
            <div className="appearance-preview-inner">
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
