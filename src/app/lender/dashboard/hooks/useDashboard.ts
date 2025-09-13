import {contractRead} from "@/utilities";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {NummusTokenAbi} from "@/contracts";
import { useEffect, useState } from "react";
import { formatEther } from "viem";

export const useDashboard = () => {
    const read = contractRead();
    const { user } = useWalletAccount();
    const [balance, setBalance] = useState<bigint | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                console.log(user);
                const result = await read<bigint>({
                    ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_TOKEN_ADDRESS as `0x${string}`,
                    abi: NummusTokenAbi,
                    functionName: "balanceOf",
                    args: [user]
                })
                setBalance(result);
            } catch (error) {
                console.error('Error fetching balance:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, []);

    const formatWithDecimals = (balance: bigint): string => {
        const value = parseFloat(formatEther(balance));
        return value.toLocaleString('es-CO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    
    return {
        balance,
        formatWithDecimals
    }
}