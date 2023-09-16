import AddWebsite from "../components/dashboard/AddWebsite";
import Statistics from "../components/dashboard/Statistics";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-basic">
          <h1 className="title">Good evening, Harun Biswas!</h1>{" "}
          <span>Free plan</span>
        </div>

        <Statistics />
        <AddWebsite />
      </div>
    </div>
  );
}
