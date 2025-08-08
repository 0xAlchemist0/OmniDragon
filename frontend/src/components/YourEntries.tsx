function YourEntries() {
  return (
    <div className="p-[2px] rounded-lg border  border-gray-800">
      <div className="bg-[#0b0f19] rounded-lg p-8">
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
            <button className="border p-2 w-80 rounded-md bg-[#fbbf24] text-white font-bold border-[#fbbf24] hover:bg-[#fbbf24]/50 hover:border-[#fbbf24]/50 hover:text-[#fbbf24]/50">
              Lock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourEntries;
