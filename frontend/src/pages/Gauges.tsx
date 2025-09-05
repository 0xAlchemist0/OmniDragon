import { useEffect, useState } from "react";
import GaugeCard from "../components/GaugeCard";
import GaugesHeader from "../components/GaugesHeader";
import { useTxService } from "../state/TxServiceProvider";

function Gauges() {
  const [partners, setPartners] = useState(null);
  const { reader, writer }: any = useTxService();

  useEffect(() => {
    getPartners();
  }, [reader]);
  async function getPartners() {
    const partnersFetched = await reader.getGaugePartners(reader);
    console.log("partners found: ");
    console.log(partnersFetched);
    setPartners(partnersFetched);
  }

  function MappedPartnersSM() {
    return (
      <div className="grid grid-flow-row gap-2">
        {partners &&
          partners.map((item: any, index: any) => {
            return <GaugeCard partner={item} />;
          })}
      </div>
    );
  }

  return (
    <div>
      <div>Gauges</div>
      <div>
        <GaugesHeader />
      </div>
      <div className="md:hidden">
        {partners !== null && <MappedPartnersSM />}
      </div>
    </div>
  );
}

export default Gauges;
