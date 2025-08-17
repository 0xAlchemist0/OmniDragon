import { usePrivy, useWallets } from "@privy-io/react-auth";

function ConnectWalletBtn({}) {
  const { ready, login, logout, authenticated }: any = usePrivy();
  const { wallets } = useWallets();
  const user = wallets[0];

  return (
    <div>
      <button
        className="text-md text-dragon-red font-light border p-2 rounded-md border-gray-800 hover:border-gray-900 hover:text-red-900"
        onClick={ready && authenticated ? logout : login}
      >
        {ready && authenticated && user
          ? user.address.slice(0, 4) +
            "..." +
            user.address.slice(user.address.length - 4, user.address.length)
          : "Connect Wallet"}
      </button>
    </div>
  );
}

export default ConnectWalletBtn;
