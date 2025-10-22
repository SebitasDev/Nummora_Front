import { ContractCallProps } from "@/types/contract.interface";
import {getReferralTag, submitReferral} from "@divvi/referral-sdk";
import {DIVVI_CONSUMER, ENVIRONMENT} from "@/Common/envairoments";
import {celo} from "@reown/appkit/networks";

export interface ContractWriteProps extends ContractCallProps {
  client: any;
  user: `0x${string}`;
}

export const contractWrite = async (
    {ContractAddress, abi, functionName, args = [], client, user}: ContractWriteProps
) => {
  try {
    if (!ContractAddress || !abi || !functionName) {
      throw new Error("Missing required contract parameters");
    }

    if (!client || !user) {
      throw new Error("Wallet not connected");
    }

    const referralTag = getReferralTag({
      user,
      consumer: DIVVI_CONSUMER,
    });

    const txHash = await client.writeContract({
      address: ContractAddress,
      abi,
      functionName,
      args,
      account: user,
      dataSuffix: `0x${referralTag}`,
    });

    if (ENVIRONMENT != "dev") await submitReferral({ txHash , chainId: celo.id});

    return txHash;
  } catch (error) {
    console.error("Contract write error:", error);
    throw error;
  }
};