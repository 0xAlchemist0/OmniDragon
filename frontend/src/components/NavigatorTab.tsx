import ConnectWalletBtn from "./ConnectWalletBtn";

function NavigatorTab() {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-[#fbbf24] text-[25px] font-bold">Red Dragon</h1>
      <ConnectWalletBtn />
    </div>
  );
}

export default NavigatorTab;
