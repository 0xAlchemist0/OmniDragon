import { useEffect, useState } from "react";
import { getPairsAll } from "../lib/dexscreener-handler";
import { useTxService } from "./TxServiceProvider";

function usePairs(searchInput: String) {
  const { reader, writer } = useTxService();
  const [pairs, setPairs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (reader) {
      getPairs();
    }
  }, [reader]);

  async function getPairs() {
    const result: any = await getPairsAll(reader);
    setPairs(result);
  }

  return pairs;
}

export default usePairs;
