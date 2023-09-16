import { useRef, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export default function LoginSignup({ isShow, handler }) {
  const ref = useRef(null);

  const [isSignup, setIsSignup] = useState(false);
  const [isPasswrod, setIsPasswrod] = useState(false);
  const [isCPasswrod, setIsCPasswrod] = useState(false);

  return (
    <div ref={ref} className={`login-signup ${(isShow && "show") || ""}`}>
      <button onClick={() => handler(false)} className="btn close">
        <IoClose />
      </button>
      <div className="login-signup-top">
        <strong>Sign up with Email</strong>
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="btn btn-switch"
        >
          Swhitch to sign {(isSignup && "In") || "Up"}
        </button>
      </div>
      <div className="login-signup-form">
        {isSignup && (
          <div className="form-inner">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
        )}
        <div className="form-inner">
          <input type="Email" placeholder="Email" />
        </div>{" "}
        <div className="form-inner">
          <input
            type={(isPasswrod && "text") || "password"}
            placeholder="Password"
          />
          <button onClick={() => setIsPasswrod(!isPasswrod)} className="eye">
            {(!isPasswrod && <BsEyeSlash />) || <BsEye />}
          </button>
        </div>{" "}
        {isSignup && (
          <div className="form-inner">
            <input
              type={(isCPasswrod && "text") || "password"}
              placeholder="Confirm Password"
            />
            <button
              onClick={() => setIsCPasswrod(!isCPasswrod)}
              className="eye"
            >
              {(!isCPasswrod && <BsEyeSlash />) || <BsEye />}
            </button>
          </div>
        )}
        <div className="form-inner">
          <button type="submit" className="btn btun-submit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
