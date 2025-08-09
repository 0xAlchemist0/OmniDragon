function HomeBottom() {
  return (
    <div className="mt-30 ">
      <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
        Ready to Build the Future?
      </h1>
      <h3 className=" text-center mt-5 text-lg font-light text-gray-400">
        Join the Red Dragon ecosystem and start building with our comprehensive
        documentation, developer tools, and community support.
      </h3>
      <span className="mt-15 grid grid-flow-row gap-5 w-75 m-auto">
        <button className="border border-yellow-900 font-extrabold  rounded-xl p-6 bg-gradient-to-r from-yellow-500 to-red-500 text-white">
          Start Building
        </button>
        <button className="border border-stone-700 rounded-xl p-6">
          Join Community
        </button>
      </span>
    </div>
  );
}

export default HomeBottom;
