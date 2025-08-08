import { FaArrowRight } from "react-icons/fa";

function JackpotCard() {
  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#b8b151] to-[#FF8E53]">
      <div className="bg-[#0b0f19] rounded-lg p-8">
        <h1 className="text-2xl text-white font-bold">Jackpot</h1>
        <h1 className="text-5xl font-bold mt-4 text-[#fbbf24]/90 ">$47,000</h1>
        <button className="flex text-lg gap-3 hover:text-gray-800 mt-6 text-[#fbbf24] ">
          <span>Swap To Enter</span>
          <FaArrowRight className="mt-1" />
        </button>
      </div>
    </div>
  );
}

export default JackpotCard;
