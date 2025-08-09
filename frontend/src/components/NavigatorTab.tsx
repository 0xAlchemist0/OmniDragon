import { IoMdMenu } from "react-icons/io";
import ConnectWalletBtn from "./ConnectWalletBtn";

function NavigatorTab() {
  return (
    <div className="flex justify-between p-4 ">
      <span className="flex gap-4">
        <IoMdMenu className="mt-2 text-2xl text-white" />
        <span className="flex gap-3">
          <img
            src="https://docs.omnidragon.io/img/logo.svg"
            alt=""
            className="size-10"
          />
          <h1 className="text-white text-lg font-bold mt-1.5">Red Dragon</h1>
        </span>
      </span>
      <ConnectWalletBtn />
    </div>
  );
}

export default NavigatorTab;
