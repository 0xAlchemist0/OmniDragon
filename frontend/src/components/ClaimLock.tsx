import { IoWalletOutline } from "react-icons/io5";

function ClaimLock({ balances }: any) {
  const { dragon } = balances;
  return (
    <div>
      <div className="border bg-[#0f172afa] border-gray-600 rounded-lg w-md m-auto p-5">
        <h1 className="font-bold text-xl text-white">Claim Lock</h1>
        <div className="border mt-2 border-gray-800"></div>
        <h3 className="text-xs mt-3 text-gray-400">
          Claim your unlocked DRAGON or rewards from your veDRAGON position.
          Claiming ensures you receive the benefits earned from locking,
          including boosted gauge rewards, lottery entries, and partner
          incentives.
        </h3>
      </div>
      <div className="border bg-[#0f172afa] border-gray-600 rounded-lg w-md m-auto p-5 mt-3">
        <span className="flex justify-between text-white mt-0.5">
          <h1>Amount</h1>
          <h1 className="text-sm text-gray-600 flex gap-2">
            <IoWalletOutline className="mt-0.5" />
            {dragon} Dragon
          </h1>
        </span>
        <div className="border mt-3 border-gray-600 rounded-md p-3 text-white ">
          <span className="flex justify-between">
            <span className="border rounded-lg border-gray-600 bg-[#0e1627] flex gap-2 p-2 mt-1">
              <img
                src="https://docs.omnidragon.io/img/logo.svg"
                alt=""
                className="size-5"
              />
              <h1 className="text-xs mt-1">VeDragon</h1>
            </span>
            <span className="grid grid-rows-1 text-gray-600">
              <h1 className="text-2xl text-right">0</h1>
              <h1 className="text-xs">~$0.00</h1>
            </span>
          </span>
        </div>
        <div className="grid grid-rows-1 gap-3 mt-5">
          <div className="border rounded-md text-right bg-gray-800 border-gray-600 text-white">
            <span className="grid grid-rows-1 p-5">
              <h1 className="text-lg">0.00 Dragon</h1>
              <h1 className="text-xs">Dragon Claimed</h1>
            </span>
          </div>
        </div>
        <div className="flex gap-3 justify-center mt-5 text-white">
          <button className="border p-2.5 rounded-lg w-50 border-gray-600 bg-gray-700">
            Cancel
          </button>
          <button className="border p-2.5 rounded-lg w-50 border-gray-600 bg-amber-600">
            Unlock Dragon
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClaimLock;
