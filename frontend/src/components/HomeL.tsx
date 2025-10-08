import { TokenARB, TokenETH, TokenMATIC, TokenSOL } from "@web3icons/react";
import { motion } from "framer-motion";
import {
  FaDiscord,
  FaGithub,
  FaGlobe,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Home() {
  const chains = [
    { name: "Ethereum", icon: <TokenETH className="size-20" /> },
    { name: "Arbitrum", icon: <TokenARB className="size-20" /> },
    { name: "Sonic", icon: <TokenSOL className="size-20" /> }, // placeholder for Sonic
    { name: "Polygon", icon: <TokenMATIC className="size-20" /> },
  ];

  return (
    <div
      className="relative min-h-screen w-[100%]  "
      style={{ background: "rgb(26, 28, 31)" }} // exact dark background
    >
      {/* ===== floating background layers ===== */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-150px] left-[-150px] w-[700px] h-[700px] bg-gradient-to-br from-[#e2ca2f] via-[#db5656] to-transparent opacity-25 blur-[180px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-gradient-to-tr from-[#db5656] to-[#e2ca2f] opacity-15 blur-[180px]" />
      </div>

      {/* ===== HERO SECTION ===== */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center pt-32 pb-40"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-yellow-400 via-white to-red-500 bg-clip-text text-transparent leading-tight"
          whileHover={{ scale: 1.01 }}
        >
          Red Dragon Protocol
        </motion.h1>
        <p className="mt-8 max-w-2xl text-gray-400 text-lg leading-relaxed">
          Powering cross-chain liquidity and verifiable randomness for the next
          generation of DeFi apps — built on LayerZero V2 and Chainlink VRF.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <Link
            to={"/liquidity"}
            className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl font-bold text-white hover:scale-105 transition"
          >
            Launch App
          </Link>
          <button className="px-10 py-4 border border-gray-700 rounded-2xl text-gray-300 hover:bg-[#1a1c20] transition flex items-center justify-center gap-2">
            <FaGithub /> View on GitHub
          </button>
        </div>
      </motion.section>

      {/* ===== PROTOCOL OVERVIEW ===== */}
      <section className="relative z-10 px-6 md:px-20 py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-5 text-white">
              A Protocol Engineered for Trustless DeFi
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Red Dragon combines omnichain interoperability with verifiable
              randomness and security. From on-chain lotteries to liquidity
              aggregation, the protocol delivers auditable, composable
              primitives across chains.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5">
              <Feature
                icon={<FaShieldAlt />}
                title="Audited Security"
                desc="Independently reviewed and monitored contracts."
              />
              <Feature
                icon={<FaRocket />}
                title="Zero Trust"
                desc="No intermediaries — fully verifiable on-chain logic."
              />
              <Feature
                icon={<MdOutlineAutoGraph />}
                title="Cross-Chain Liquidity"
                desc="Unified pools spanning multiple networks."
              />
              <Feature
                icon={<FaGlobe />}
                title="Global Reach"
                desc="Connect users and assets across ecosystems."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#1a1c20] to-[#2a2c31] p-10 rounded-3xl shadow-2xl border border-gray-800 relative overflow-hidden">
              <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-gradient-to-r from-yellow-500 to-red-500 opacity-25 blur-[100px]" />
              <h3 className="text-xl font-semibold mb-6 text-gray-300">
                Protocol Metrics (Live Sync)
              </h3>
              <ul className="space-y-5 text-gray-400">
                <li className="flex justify-between">
                  <span>Total Volume</span>{" "}
                  <span className="text-white font-semibold">$84.2M</span>
                </li>
                <li className="flex justify-between">
                  <span>Transactions</span>{" "}
                  <span className="text-white font-semibold">11.3M</span>
                </li>
                <li className="flex justify-between">
                  <span>Chains Connected</span>{" "}
                  <span className="text-white font-semibold">8</span>
                </li>
                <li className="flex justify-between">
                  <span>Uptime</span>{" "}
                  <span className="text-white font-semibold">99.98%</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ECOSYSTEM GRID ===== */}
      <section className="relative z-10 px-10 py-28 bg-[rgb(26,28,31)] border-y border-gray-800 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Connected Ecosystems
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-center ms-10 ">
          {chains.map((chain) => (
            <motion.div
              key={chain.name}
              whileHover={{ scale: 1.05 }}
              className=" "
            >
              <div className="mb-2">{chain.icon}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative z-10 text-center py-28">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent"
        >
          Ready to Build with Red Dragon?
        </motion.h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg">
          Start integrating today using our developer toolkit and documentation
          suite.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="px-10 py-5 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl font-bold hover:scale-105 transition">
            Start Building
          </button>
          <button className="px-10 py-5 border border-gray-700 rounded-2xl hover:bg-[#1c1f27] transition flex items-center justify-center gap-2">
            <FaDiscord /> Join Community
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Red Dragon Protocol — Built on LayerZero &
        Chainlink
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="text-yellow-400 text-2xl">{icon}</div>
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
