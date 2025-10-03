import React, { useContext, useEffect } from "react";
import { Read } from "../lib/contract-reads";
import { Write } from "../lib/contract-writes";
const TxServiceContext: any = React.createContext(null);

function TxServiceProvider({ children, userInfo }: any) {
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
      <TxServiceContext.Provider value={txServices}>
        {children}
      </TxServiceContext.Provider>
    </>
  );
}

export function useTxService() {
  const context: any = useContext(TxServiceContext);
  if (!context) throw new Error("No context");

  return context;
}

export default TxServiceProvider;
