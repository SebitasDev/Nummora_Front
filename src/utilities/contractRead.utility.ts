import {useWalletAccount} from "@/hooks/useWalletAccount";
import {ContractCallProps} from "@/types/contract.interface";

export const contractRead = () => {
    const { publicClient } = useWalletAccount();

    return async <T = unknown>(
        {ContractAddress, abi, functionName, args = []}: ContractCallProps
    ): Promise<T> => {
        if (!publicClient) throw new Error("Client not connected");

        return await publicClient.readContract({
            address: ContractAddress,
            abi,
            functionName,
            args
        }) as T;
    };
};