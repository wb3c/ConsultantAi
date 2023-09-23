import Cookies from "js-cookie";
import AddWebsite from "../components/dashboard/AddWebsite";
import Chatbots from "../components/dashboard/Chatbots";
import DeleteChatbot from "../components/dashboard/DeleteChatbot";
import Statistics from "../components/dashboard/Statistics";
import values from "../values";

export default function Dashboard() {
  const user = Cookies.get("loginData") && JSON.parse(Cookies.get("loginData"));

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-basic">
          <h1 className="title">
            Good {values.getCurrentTime()}, {user?.firstName} {user?.lastName}!
          </h1>{" "}
          <span>Free plan</span>
        </div>

        <Statistics />
        <AddWebsite />
        <Chatbots />
        <DeleteChatbot />
      </div>
    </div>
  );
}
