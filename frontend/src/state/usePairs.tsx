import { useEffect, useState } from "react";
import {
  formatPairs,
  getPairsAll,
  searchDexscreener,
} from "../lib/dexscreener-handler";
import { useTxService } from "./TxServiceProvider";

function usePairs(searchInput: any) {
  const { reader, writer } = useTxService();
  const [pairs, setPairs] = useState([]);
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    if (reader) {
      getPairs();
    }
  }, [reader]);

  useEffect(() => {
    if (!searchInput) return;

    const inVal = searchInput.in?.trim();
    const outVal = searchInput.out?.trim();

    if (!inVal && !outVal) {
      // both empty → fallback
      setSearchResults(null);
      return;
    }

    if (inVal) {
      searchToken("in");
    } else if (outVal) {
      searchToken("out");
    }
  }, [searchInput]);

  useEffect(() => {
    setSearchResults(null);
  }, []);

  async function searchToken(type: "in" | "out") {
    const chainName: any = await reader.getChainName();
    const result: any = await searchDexscreener(searchInput[type], chainName);
    const formatted: any = await formatPairs([result], reader);

    if (formatted?.length > 0) {
      setSearchResults(formatted[0]);
    } else {
      setSearchResults(null); // fallback
    }
  }
  async function getPairs() {
    const result: any = await getPairsAll(reader);
    setPairs(result);
  }

  return { pairs, searchResults };
}

export default usePairs;
