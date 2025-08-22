import { useWallets } from "@privy-io/react-auth";
import React, { useEffect } from "react";
import { Read } from "../lib/contract-reads";
import { Write } from "../lib/contract-writes";
const TxServiceContext: any = React.createContext(null);

function DetectWallet() {}

function TxServiceProvider({ children, userInfo }: any) {
  const { wallets } = useWallets();

  const { account, provider, chainConfig } = userInfo;

  const txServices = {
    reader: new Read(account, chainConfig, provider),
    writer: new Write(provider, account, chainConfig),
  };

  useEffect(() => {
    txServices.reader.updateWallet(userInfo.account);
    txServices.writer.updateUserInfo(userInfo.account, userInfo.provider);
  }, [userInfo]);

  return (
    <>
      {wallets && (
        <TxServiceContext.Provider value={txServices}>
          {children}
        </TxServiceContext.Provider>
      )}
    </>
  );
}

export default TxServiceProvider;
