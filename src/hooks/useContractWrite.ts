import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ContractCallProps } from "@/types/contract.interface";
import { getReferralTag } from "@divvi/referral-sdk";
import { useAccount } from 'wagmi';
import { celoAlfajores } from "@reown/appkit/networks";

export const useContractWrite = () => {
    const { address: user } = useAccount();
    const { writeContractAsync, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const write = async (
        {ContractAddress, abi, functionName, args = []}: ContractCallProps
    ) => {
        try {
            if (!ContractAddress || !abi || !functionName) throw new Error("Missing required contract parameters");

            if (!user) throw new Error("Wallet not connected");

            const referralTag = getReferralTag({
                user,
                consumer: process.env.NEXT_PUBLIC_DIVVI_CONSUMER as `0x${string}`,
            });

            const txHash = await writeContractAsync({
                address: ContractAddress,
                abi,
                functionName,
                args,
                dataSuffix: `0x${referralTag}` as `0x${string}`,
            });

            const chainId = celoAlfajores.id;

            //await submitReferral({ txHash, chainId });

            return txHash;
        } catch (error) {
            console.error("Contract write error:", error);
            throw error;
        }
    };

    return {
        write,
        isConnected: !!user,
        isPending,
        isConfirming,
        isConfirmed,
        error,
        hash
    };
};