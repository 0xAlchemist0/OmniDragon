import { useEffect, useState } from "react";

function LotteryHistory() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTX = async () => {
      const result = await fetch("api/transactions");
      const jsonres = await result.json();
      setTransactions(jsonres);
    };
    getTX();
  }, []);
  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r  from-yellow-700 to-red-800">
      <div className="bg-[#0f172afa] rounded-lg p-5 text-white text-[20px] ">
        <h1 className="text-2xl font-bold mb-4">Lottery History</h1>

        {transactions &&
          transactions.map((item, index) => {
            let { address, amount }: any = item;
            address =
              address.slice(0, 4) +
              "..." +
              address.slice(address.length - 4, address.length);

            return (
              <div key={index} className="mt-3 text-[#fbbf24] text-sm">
                <span className="flex justify-between">
                  <h1>{address || null}</h1>
                  <h1>{amount} Dragon</h1>
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LotteryHistory;
