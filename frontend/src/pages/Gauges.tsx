import { useEffect, useState } from "react";
import { getTokensInfo } from "../lib/dexscreener-handler";
import { useTxService } from "../state/TxServiceProvider";

function Gauges() {
  const [partners, setPartners] = useState();
  const { reader, writer }: any = useTxService();

  useEffect(() => {
    getPartners();
  }, [reader]);
  async function getPartners() {
    const partnersRaw = await reader.getGaugePartners();
    const partnersInfo = await getTokensInfo(partnersRaw, reader);
  }
  return <div>Gauges</div>;
}

export default Gauges;
