import { useEffect, useState } from "react";
import { useTxService } from "../state/TxServiceProvider";

function Gauges() {
  const [partners, setPartners] = useState();
  const { reader, writer }: any = useTxService();

  useEffect(() => {
    getPartners();
  }, [reader]);
  async function getPartners() {
    const partners = await reader.getGaugePartners(reader);
  }
  return <div>Gauges</div>;
}

export default Gauges;
