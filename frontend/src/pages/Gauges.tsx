import { useEffect } from "react";
import { useTxService } from "../state/TxServiceProvider";

function Gauges() {
  const { reader, writer }: any = useTxService();

  useEffect(() => {
    getPartners();
  }, [reader]);
  async function getPartners() {
    const res = await reader.getGaugePartners();
    console.log(res);
  }
  return <div>Gauges</div>;
}

export default Gauges;
