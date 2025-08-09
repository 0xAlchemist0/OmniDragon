import { usePrivy } from "@privy-io/react-auth";

function ConnectWalletBtn() {
  const { ready, login, logout }: any = usePrivy();

  return (
    <div>
      <button
        className="text-md text-dragon-red font-light border p-2 rounded-md border-gray-800 hover:border-gray-900 hover:text-red-900"
        onClick={ready ? logout : login}
      >
        {ready ? "0x1679...6969" : "Connect Wallet"}
      </button>
    </div>
  );
}

export default ConnectWalletBtn;
