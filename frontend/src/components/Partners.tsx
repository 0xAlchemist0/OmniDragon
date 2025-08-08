import { useEffect, useState } from "react";

function PartnersCard() {
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    const getPartners = async () => {
      const result = await fetch("api/partners");
      const res = await result.json();
      setPartners(res);
      console.log(res);
    };
    getPartners();
  }, []);
  return (
    <div className="border border-gradient-to-r from-[#FF2C55] to-[#FF8E53]  rounded-lg p-8">
      <h1 className="text-2xl font-bold">Partners</h1>
      <div className="mt-5 text-white text-xl ">
        {partners &&
          partners.map((item: any) => {
            return (
              <div
                key={item.id}
                className="mt-3 flex justify-between font-semibold"
              >
                <span className="flex gap-3 ">
                  <img
                    src={item.logo}
                    alt=""
                    className="size-7 border rounded-full border-gray-800"
                  />
                  <h1>{item.name}</h1>
                </span>
                <h1 className="text-neon-cyan text-lg">3.5x Boost</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PartnersCard;
