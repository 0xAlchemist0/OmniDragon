import { FaArrowDown } from "react-icons/fa";

function LockDex() {
  return (
    <div className="border bg-[#0f172afa] border-gray-600 rounded-lg w-md m-auto p-5">
      <h1 className="font-bold text-3xl text">Lock</h1>
      <h3 className="text-md mt-2 text-gray-400">
        Locking DRAGON gives you veDRAGON, which lets you earn boosted rewards
        from gauges, influence reward distribution through voting, and get
        access to lotteries and partner incentives.
      </h3>

      <div className="mt-5">
        <div className="border rounded-2xl p-4  grid grid-rows-3">
          <div>
            <h1 className="text-gray-600">From</h1>
          </div>
          <div>
            <span className="flex justify-between">
              <h1 className="text-4xl">0.00</h1>
              <div className="border p-2 rounded-lg flex gap-3">
                <h1>4xl</h1>
                <h1>Dragon</h1>
              </div>
            </span>
          </div>
          <div className="flex justify-between mt-3">
            <h1>$0.00</h1>
            <h1>Balance: 0.00</h1>
          </div>
        </div>
        <div className="flex justify-center p-3">
          <FaArrowDown />
        </div>
        <div className="border rounded-md p-2 "></div>
      </div>
      <div className="mt-5 flex justify-center">
        <button className="border border-yellow-900 font-extrabold  rounded-xl p-2 bg-yellow-600 text-white w-90">
          Lock and Activate
        </button>
      </div>
    </div>
  );
}

export default LockDex;
