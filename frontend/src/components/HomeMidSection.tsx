import { motion } from "framer-motion";
import { FaInfinity, FaLink, FaShieldAlt } from "react-icons/fa";

function HomeMidSection() {
  const cards = [
    {
      icon: <FaInfinity className="text-yellow-400 text-2xl" />,
      title: "Cross-Chain Architecture",
      content:
        "Seamless token transfers across Sonic, Ethereum, Arbitrum, Base, and Avalanche — powered by LayerZero V2.",
    },
    {
      icon: <FaLink className="text-pink-400 text-2xl" />,
      title: "Verifiable Randomness",
      content:
        "Transparent, cryptographically secure randomness with Chainlink VRF — powering fair DeFi mechanics.",
    },
    {
      icon: <FaShieldAlt className="text-green-400 text-2xl" />,
      title: "Enterprise Security",
      content:
        "Audited contracts, emergency controls, and role-based access ensure ultimate on-chain resilience.",
    },
  ];

  return (
    <div className="bg-[#0f172a] py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        Built for the Future of DeFi
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] md:w-[80%] mx-auto">
        {cards.map((card, idx) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={idx}
            className="p-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-[#1e293b] to-[#0f172a] shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              {card.icon}
              <h2 className="text-xl font-semibold text-white">{card.title}</h2>
            </div>
            <p className="text-gray-400">{card.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomeMidSection;
