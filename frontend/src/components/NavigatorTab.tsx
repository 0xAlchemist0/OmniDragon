import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import ConnectWalletBtn from "./ConnectWalletBtn";

function NavigatorTab() {
  return (
    <div className="flex justify-between p-4 ">
      <span className="flex gap-4">
        <IoMdMenu className="mt-2 text-2xl text-white block md:hidden" />
        <span className="flex gap-3">
          <img
            src="https://docs.omnidragon.io/img/logo.svg"
            alt=""
            className="size-10"
          />
          <Link
            to={"/"}
            className="text-white text-lg font-bold mt-1.5 text-nowrap"
          >
            Red Dragon
          </Link>
        </span>
        <span className=" gap-3 mt-2 text-gray-300 font-semibold hidden md:block text-md">
          <span className="flex gap-3">
            <Link to={"/liquidity"}>Liquidity</Link>
            <h1>Lock</h1>
            <h1>Voting</h1>
          </span>
        </span>
      </span>
      <ConnectWalletBtn />
    </div>
  );
}

export default NavigatorTab;
