import { useEffect, useState } from "react";
import {
  formatPairs,
  getDefaultPair,
  getPairsAll,
  getTokensInfoV2,
  searchDexscreener,
} from "../lib/dexscreener-handler";
import { useTxService } from "./TxServiceProvider";

function usePairs(
  searchInput: any,
  setTokens: any,
  txResults: any,
  tokens: any
) {
  const { reader, writer } = useTxService();
  const [pairs, setPairs] = useState([]);
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    if (reader) {
      getDefault();

      getPairs();
    }
  }, [reader]);
  useEffect(() => {
    console.log(txResults);
    if (txResults && txResults.complete === true) {
      recheckBalance();
      getPairs();
    }
  }, [txResults]);

  async function recheckBalance() {
    setTimeout(async () => {
      const result = await getTokensInfoV2(
        [tokens.in.address, tokens.out.address],
        reader
      );
      console.log("Rechecking balance ");
      console.log(result);
      setTokens({
        in: result[0],
        out: result[1],
      });
    }, 1000);
  }
  // useEffect(() => {
  //   if (searchInput.in === "" && searchInput.out === "") setSearchResults(null);
  //   if (!searchInput) return;

  //   const inVal = searchInput.in?.trim();
  //   const outVal = searchInput.out?.trim();

  //   if (!inVal && !outVal) {
  //     // both empty → fallback
  //     setSearchResults(null);
  //     return;
  //   }

  //   if (inVal !== "") {
  //     searchToken("in");
  //   } else if (outVal != "") {
  //     searchToken("out");
  //   }
  // }, [searchInput]);

  useEffect(() => {
    console.log("updaye:", searchInput);
  }, [searchInput]);

  useEffect(() => {
    setSearchResults(null);
  }, []);

  async function getDefault() {
    const result: any = await getDefaultPair(reader);
    console.log(result, "result");
    setTokens({
      in: result[0],
      out: result[1],
    });
  }
  useEffect(() => {
    console.log(pairs);
    console.log(searchResults);
  }, [pairs, searchResults]);

  async function searchToken(type: "in" | "out", value: any, setNull: any) {
    console.log("setNull: ", setNull);
    if (setNull) {
      setSearchResults(null);
    } else {
      const chainName: any = await reader.getChainName();
      const result: any = await searchDexscreener(value, chainName);
      const formatted: any = await formatPairs([result], reader);

      if (formatted?.length > 0) {
        setSearchResults(formatted[0]);
      } else {
        setSearchResults(null); // fallback
      }
    }
  }
  async function getPairs() {
    const result: any = await getPairsAll(reader);
    setPairs(result);
  }

  return { pairs, searchResults, searchToken };
}

export default usePairs;
