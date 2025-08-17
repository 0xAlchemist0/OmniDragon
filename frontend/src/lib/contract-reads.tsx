import viemClient from "../utils/ViemClient";

export default async function balanceOf(
  tokenAddress: any,
  userAddress: any,
  abi: any
) {
  try {
    const data: any = await viemClient.readContract({
      address: tokenAddress,
      account: userAddress,
      abi,
      functionName: "balanceOf",
    });
    console.log("Balance:", data);
  } catch (error) {
    console.log("Error", error);
  }
}
