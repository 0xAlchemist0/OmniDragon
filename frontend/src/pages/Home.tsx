import HomeBottom from "../components/HomeBottom";
import HomeHero from "../components/HomeHero";
import HomeMidSection from "../components/HomeMidSection";

function Home() {
  return (
    <div>
      <div className="p-5">
        <HomeHero />
        <HomeMidSection />
        <HomeBottom />
      </div>
    </div>
  );
}

export default Home;
