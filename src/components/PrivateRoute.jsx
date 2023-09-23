import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  if (!Cookies.get("loginData")) {
    return <Navigate to="login" />;
  }

  return children;
};

export default PrivateRoute;
