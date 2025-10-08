function HomeBottom() {
  return (
    <div className="text-center py-24 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
      <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        Ready to Build the Future?
      </h1>
      <p className="text-gray-400 mt-5 max-w-xl mx-auto text-lg">
        Join the Red Dragon ecosystem and start building with our developer
        tools, documentation, and active community.
      </p>

      <div className="mt-10 flex flex-col md:flex-row justify-center gap-5">
        <button className="border border-yellow-900 font-extrabold rounded-xl px-8 py-4 bg-gradient-to-r from-yellow-500 to-red-500 hover:opacity-90 transition-all">
          Start Building
        </button>
        <button className="border border-stone-700 rounded-xl px-8 py-4 hover:bg-gray-800 transition-all">
          Join Community
        </button>
      </div>
    </div>
  );
}

export default HomeBottom;
