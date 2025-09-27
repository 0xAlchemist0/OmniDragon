import { useEffect } from "react";
import { useTxService } from "./TxServiceProvider";

function usePairs() {
  const { reader, writer } = useTxService();

  useEffect(() => {
    getPairs();
  }, [reader]);

  async function getPairs() {
    const chainName = await reader.getChainName();
  }
}
