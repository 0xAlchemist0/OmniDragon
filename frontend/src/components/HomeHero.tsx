import { motion } from "framer-motion";
import { FaBook, FaGithub } from "react-icons/fa";

function HomeHero() {
  function HeroStat({ top, bottom }: any) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold text-[#ff6b7a]">{top}</h1>
        <h1 className="text-sm text-stone-300">{bottom}</h1>
      </motion.div>
    );
  }

  return (
    <div className="text-center text-white py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#e2ca2f] via-white to-[#db5656] bg-clip-text text-transparent"
      >
        Red Dragon
      </motion.h1>

      <p className="text-xl md:text-2xl mt-8 font-semibold text-gray-200">
        Next-Generation Cross-Chain Protocol
      </p>

      <p className="max-w-2xl mx-auto mt-5 text-gray-400 leading-relaxed">
        A revolutionary ERC-20 compatible token protocol built on LayerZero V2,
        delivering secure cross-chain functionality with cryptographically
        verifiable randomness via Chainlink VRF integration.
      </p>

      <div className="flex justify-center gap-10 mt-12">
        <HeroStat top="5+" bottom="Supported Chains" />
        <HeroStat top="100%" bottom="Verifiable" />
        <HeroStat top="24/7" bottom="Active Protocol" />
      </div>

      <div className="mt-14 flex flex-col md:flex-row justify-center gap-5">
        <button className="flex items-center justify-center gap-2 border border-yellow-900 font-bold rounded-xl px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 hover:opacity-90 transition-all">
          <FaBook /> Explore Documentation
        </button>
        <button className="flex items-center justify-center gap-2 border border-stone-700 rounded-xl px-8 py-4 hover:bg-gray-800 transition-all">
          <FaGithub /> View on GitHub
        </button>
      </div>
    </div>
  );
}

export default HomeHero;
