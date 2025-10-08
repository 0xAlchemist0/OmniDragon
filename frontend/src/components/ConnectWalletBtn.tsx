import { usePrivy, useWallets } from "@privy-io/react-auth";
import { MetaMaskAvatar } from "react-metamask-avatar";
function ConnectWalletBtn({}) {
  const { ready, login, logout, authenticated }: any = usePrivy();
  const { wallets } = useWallets();
  const user = wallets[0];

  return (
    <div>
      <button
        className="text-md text-gray-200 font-light border p-2 rounded-lg border-gray-800 hover:border-gray-900 hover:text-gray-300"
        onClick={ready && authenticated ? logout : login}
      >
        {ready && authenticated && user ? (
          <div className="flex gap-3 px-2">
            <MetaMaskAvatar variant="medium" address={user.address} />

            <h1 className="text-sm mt-[3px]">
              {user.address.slice(0, 4) +
                "..." +
                user.address.slice(
                  user.address.length - 4,
                  user.address.length
                )}
            </h1>
          </div>
        ) : (
          "Connect Wallet"
        )}
      </button>
    </div>
  );
}

export default ConnectWalletBtn;
