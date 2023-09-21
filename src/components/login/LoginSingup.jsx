import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import values from "../../values";

export default function LoginSignup({ isShow, handler }) {
  const ref = useRef(null);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [isPasswrod, setIsPasswrod] = useState(false);
  const [isCPasswrod, setIsCPasswrod] = useState(false);

  // data handler
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      .post(
        (isSignup && `${values.url}users`) || `${values.url}users/login`,
        data
      )
      .then((d) => {
        if (isSignup) {
          setIsSignup(false);
        } else {
          Cookies.set("loginData", JSON.stringify(d.data.user));
          navigate("/");
        }
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
        // console.log(e.response.data.errors);
      });
  };

  return (
    <div ref={ref} className={`login-signup ${(isShow && "show") || ""}`}>
      <button onClick={() => handler(false)} className="btn close">
        <IoClose />
      </button>
      <div className="login-signup-top">
        <strong>Sign up with Email</strong>
        <button
          onClick={() => {
            setIsSignup(!isSignup);
            setErrors({});
          }}
          className="btn btn-switch"
        >
          Swhitch to sign {(isSignup && "In") || "Up"}
        </button>
      </div>
      <div className="login-signup-form">
        {isSignup && (
          <div className="form-inner">
            <div
              className={`form-group ${
                (errors && errors.firstName && "error") || ""
              }`}
            >
              <input
                name="firstName"
                value={data.firstName}
                type="text"
                placeholder="First Name"
                onChange={changeHandler}
              />
              {errors.firstName && <span>{errors.firstName.msg}</span>}
            </div>
            <div
              className={`form-group ${
                (errors && errors.lastName && "error") || ""
              }`}
            >
              <input
                name="lastName"
                value={data.lastName}
                type="text"
                placeholder="Last Name"
                onChange={changeHandler}
              />
              {errors.lastName && <span>{errors.lastName.msg}</span>}
            </div>
          </div>
        )}
        <div className="form-inner">
          <div
            className={`form-group ${
              (errors && errors.email && "error") || ""
            }`}
          >
            <input
              name="email"
              value={data.email}
              type="Email"
              placeholder="Email"
              onChange={changeHandler}
            />
            {errors.email && <span>{errors.email.msg}</span>}
          </div>
        </div>{" "}
        <div className="form-inner">
          <div
            className={`form-group ${
              (errors && errors.password && "error") || ""
            }`}
          >
            <input
              type={(isPasswrod && "text") || "password"}
              placeholder="Password"
              name="password"
              value={data.passwrod}
              onChange={changeHandler}
            />
            {errors.password && <span>{errors.password.msg}</span>}
          </div>{" "}
          <button onClick={() => setIsPasswrod(!isPasswrod)} className="eye">
            {(!isPasswrod && <BsEyeSlash />) || <BsEye />}
          </button>
        </div>{" "}
        {isSignup && (
          <div className="form-inner">
            <div
              className={`form-group ${
                (data.confirmPassword &&
                  data.password !== data.confirmPassword &&
                  "error") ||
                ""
              }`}
            >
              <input
                type={(isCPasswrod && "text") || "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={changeHandler}
              />
              <span>passwrod not matched</span>
            </div>

            <button
              onClick={() => setIsCPasswrod(!isCPasswrod)}
              className="eye"
            >
              {(!isCPasswrod && <BsEyeSlash />) || <BsEye />}
            </button>
          </div>
        )}
        <div className="form-inner">
          <button onClick={submitHandler} className="btn btun-submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
