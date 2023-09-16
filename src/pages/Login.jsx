import { useState } from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { TfiEmail } from "react-icons/tfi";
import logo from "../assets/logo.jpeg";
import LoginSignup from "../components/login/LoginSingup";

export default function Login() {
  const [isEmail, setIsEmail] = useState(false);
  return (
    <div className="login">
      <LoginSignup handler={setIsEmail} isShow={isEmail} />
      <div className="login-inner">
        <a href="/" className="brand">
          <img src={logo} alt="" />
          <strong>consultant ai</strong>
        </a>
        <button
          onClick={() => {
            setIsEmail(true);
          }}
          className="btn btn-email"
        >
          <TfiEmail /> Continue with Email
        </button>
        <button className="btn btn-fb">
          <FaSquareFacebook /> Continue with FaceBook
        </button>
        <button className="btn btn-google">
          <FcGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
}
