import JackpotCard from "../components/JackpotCard";
import LotteryHistory from "../components/LotteryHistory";
import PartnersCard from "../components/Partners";
import YourEntries from "../components/YourEntries";

function Dashboard() {
  return (
    <div className="p-2">
      <div className="grid grid-flow-row gap-3">
        <JackpotCard />

        <YourEntries />
        <LotteryHistory />

        <PartnersCard />
      </div>
    </div>
  );
}

export default Dashboard;
