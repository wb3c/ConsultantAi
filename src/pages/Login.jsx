import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { TfiEmail } from "react-icons/tfi";
import logo from "../assets/logo.jpeg";
import LoginSignup from "../components/login/LoginSingup";

export default function Login() {
  const [isEmail, setIsEmail] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response from Google here
  };
  const faildGoogle = (response) => {
    console.log(response);
    // Handle the response from Google here
  };
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
        {/* <button className="btn btn-fb">
          <FaSquareFacebook /> Continue with FaceBook
        </button> */}
        {/* <button className="btn btn-google">
          <FcGoogle /> Continue with Google
        </button> */}
        <GoogleLogin
          className="btn btn-google"
          clientId="338034772914-mjrgaac463v0pkbke93ck8t2dd0urv1s.apps.googleusercontent.com"
          buttonText="Signin with Google"
          onSuccess={responseGoogle}
          onFailure={faildGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}
