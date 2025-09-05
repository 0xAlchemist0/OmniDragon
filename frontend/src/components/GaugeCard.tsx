function GaugeCard({ partner }: any) {
  const { partnerDetails, info } = partner;
  const partnerName = partnerDetails[0];
  const feeShare = partnerDetails[1];
  const partnerBoost = partnerDetails[2];
  const logo = info["imageUrl"];
  function TwoColorText({ color, size, first, second }: any) {
    return (
      <span className={`flex gap-2 text-[11px]`}>
        <h1 className={`text-${color}-400`}>{first}:</h1>
        <h1 className="">{second}</h1>
      </span>
    );
  }

  function GaugeStats({ stats }: any) {
    return <div>Stats</div>;
  }

  return (
    <div className="border rounded-sm text-sm bg-gray-800 border-gray-600 text-white w-[93%] m-auto">
      <div className="flex justify-between p-4">
        <span>
          <span className="flex gap-3">
            <span className="flex gap-2">
              {/* <img src={logo} alt="" className="size-5" /> */}
              <h1> {partnerDetails[0]}/Sonic</h1>
            </span>
            <h1 className="border text-xs w-20 p-0.5 bg-gray-900 border-gray-600 rounded-md text-center text-nowrap">
              {partnerBoost}% FEE
            </h1>
          </span>
          <span>
            <h1 className="text-[10px] font-semibold mt-1">Dragon CL</h1>
          </span>
        </span>
        <span className=" font-light grid grid-flow-row ">
          <TwoColorText
            color={"gray"}
            size={"9"}
            first={"APR"}
            second={`${partnerBoost}%`}
          />
          <TwoColorText
            color={"gray"}
            size={"9"}
            first={"Rewards"}
            second={"$34956"}
          />
        </span>
      </div>
      <div className="mt-2 mb-2 ms-2 text-xs">
        <GaugeStats info={null} />
      </div>
      <div className="bg-gray-800 border-gray-800 border w-full p-2">
        <h1 className="text-xs ms-1">My Vote</h1>
        <div className="border rounded-sm text-xs border-gray-800 bg-gray-900 p-2 mt-2 flex justify-between">
          <h1 className="mt-auto mb-auto">0%</h1>
          <button className="border w-12 p-1 rounded-sm border-gray-600 text-gray-200">
            Max
          </button>
        </div>
      </div>
    </div>
  );
}

export default GaugeCard;
