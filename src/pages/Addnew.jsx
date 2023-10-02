import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import values from "../values";

export default function Addnew() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    agent: "",
    matarials: "",
  });
  const user = JSON.parse(Cookies.get("loginData"));
  const token = user ? user.token : null;

  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    setErrors((prev) => {
      return {
        ...prev,
        [e.target.name]: null,
      };
    });
  };

  const submitHandler = () => {
    axios
      .post(`${values.url}chatbot/addchatbot`, data, {
        headers: {
          token: token,
        },
      })
      .then((d) => {
        console.log(d.data._id);
        axios
          .put(
            `${values.url}chatbot/activechatbot`,
            { chatbotId: d.data._id },
            {
              headers: {
                token: user?.token,
              },
            }
          )
          .then(() => {
            navigate("/");
            window.location.reload();
          })
          .catch((e) => {
            console.log(e.response);
          });
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
        console.log(e.response.data.errors);
      });
  };

  return (
    <div className="addnew">
      <div className="container">
        <h1 className="title">Create Chatbot</h1>
        <div className="addnew-form bg-white">
          <div
            className={`addnew-form-group ${
              (errors && errors.name && "error") || ""
            }`}
          >
            <label htmlFor="">Web site url</label>
            <input
              type="text"
              name="name"
              id=""
              placeholder="https://example.com"
              value={data.name}
              onChange={changeHandler}
            />
            {errors.name && <span>{errors.name.msg}</span>}
          </div>
          <div
            className={`addnew-form-group ${
              (errors && errors.name && "error") || ""
            }`}
          >
            <label htmlFor="">Business Name</label>
            <input
              type="text"
              name="name"
              id=""
              placeholder="Enter your Business Name"
              value={data.name}
              onChange={changeHandler}
            />
            {errors.name && <span>{errors.name.msg}</span>}
          </div>
          <div
            className={`addnew-form-group ${
              (errors && errors.agent && "error") || ""
            }`}
          >
            <label htmlFor="">Agent Name</label>
            <input
              type="text"
              name="agent"
              value={data.agent}
              id=""
              placeholder="Enter Agent Name"
              onChange={changeHandler}
            />
            {errors.agent && <span>{errors.agent.msg}</span>}
          </div>
          <div
            className={`addnew-form-group ${
              (errors && errors.matarials && "error") || ""
            }`}
          >
            <label htmlFor="">Truining Matarials</label>
            <textarea
              value={data.matarials}
              name="matarials"
              placeholder="type here ..."
              id=""
              onChange={changeHandler}
            ></textarea>
            {errors.matarials && <span>{errors.matarials.msg}</span>}
          </div>
          <button onClick={submitHandler} className="btn">
            Create New Chatbot
          </button>
        </div>
      </div>
    </div>
  );
}
