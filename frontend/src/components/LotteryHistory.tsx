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
    <div className="border border-gray-800 rounded-lg p-8 text-white">
      <h1 className="text-2xl font-bold">Lottery History</h1>
      <div className="text-[20px] mt-5">
        {transactions &&
          transactions.map((item) => {
            let { address, amount }: any = item;
            address =
              address.slice(0, 4) +
              "..." +
              address.slice(address.length - 4, address.length - 1);

            return (
              <div
                key={item}
                className="text-white mt-3 text-neon-cyan text-sm"
              >
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
