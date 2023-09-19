export default function Addnew() {
  return (
    <div className="addnew">
      <div className="container">
        <h1 className="title">Create Chatbot</h1>
        <div className="addnew-form bg-white">
          <div className="addnew-form-group">
            <label htmlFor="">Business Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your Business Name"
            />
          </div>
          <div className="addnew-form-group">
            <label htmlFor="">Agent Name</label>
            <input type="text" name="" id="" placeholder="Enter Agent Name" />
          </div>
          <div className="addnew-form-group">
            <label htmlFor="">Truining Matarials</label>
            <textarea name="" placeholder="type here ..." id=""></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
