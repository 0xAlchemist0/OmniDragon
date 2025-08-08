import JackpotCard from "../components/JackpotCard";
import LotteryHistory from "../components/LotteryHistory";
import PartnersCard from "../components/Partners";

function Home() {
  return (
    <div className="p-2">
      <div className="grid grid-flow-row gap-3">
        <JackpotCard />
        <LotteryHistory />
        <PartnersCard />
      </div>
    </div>
  );
}

export default Home;
