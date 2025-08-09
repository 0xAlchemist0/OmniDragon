function YourEntries() {
  return (
    <div className="p-[2px] rounded-lg border  border-gray-800">
      <div className="bg-[#0f172afa] rounded-lg p-8">
        <h1 className="text-2xl text-white font-bold">Your Entries</h1>
        <div className="mt-5">
          <span className="flex justify-between text-xl">
            <h1 className="text-white">Tickets</h1>
            <h1 className="text-[#fbbf24]">0</h1>
          </span>
          <span className="flex justify-between text-xl mt-3">
            <h1 className="text-white">Boosts</h1>
            <h1 className="text-[#fbbf24]">0</h1>
          </span>
          <div className="mt-8 flex justify-center">
            <button className="border border-yellow-900 font-extrabold  rounded-xl p-2 w-70 bg-gradient-to-r from-yellow-500 to-red-500 text-white">
              Lock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourEntries;
