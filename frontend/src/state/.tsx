import React, { useEffect } from "react";
import { Read } from "../lib/contract-reads";
import { Write } from "../lib/contract-writes";

function TxServiceProvider({ children, userInfo }: any) {
  const TxServiceContext: any = React.createContext(null);

  const { account, provider } = userInfo;

  const txServices = {
    reader: new Read(),
    writer: new Write(provider, account, "146"),
  };

  useEffect(() => {
    txServices.reader.updateWallet(userInfo.account);
    txServices.writer.updateUserInfo(userInfo.account, userInfo.provider);
  }, [userInfo]);

  return (
    <TxServiceContext.provider value={txServices}>
      {children}
    </TxServiceContext.provider>
  );
}

export default TxServiceProvider;
