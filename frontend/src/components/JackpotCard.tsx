import { FaArrowRight } from "react-icons/fa";

function JackpotCard() {
  return (
    <div className="border border-gradient-to-r from-[#FF2C55] to-[#FF8E53]  rounded-lg p-8 ">
      <h1 className="text-2xl text-white font-bold">Jackpot</h1>
      <h1 className="text-5xl font-bold mt-4">$47,000</h1>
      <button className="flex text-lg gap-3  hover:text-gray-800">
        <h1 className=" mt-6 ">Swap To Enter</h1>
        <FaArrowRight className="mt-7" />
      </button>
    </div>
  );
}

export default JackpotCard;
