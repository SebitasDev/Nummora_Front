import { useEffect, useState } from "react";
import { http, useAccount, useWalletClient } from "wagmi";
import { createPublicClient, createWalletClient } from "viem";
import { liskSepolia } from "@reown/appkit/networks";

export const useWalletAccount = () => {
    const { isConnected, address } = useAccount();
    const { data: walletClient } = useWalletClient();
    const [user, setUser] = useState<`0x${string}` | null>(null);

    useEffect(() => {
        if (isConnected && address) {
            setUser(address as `0x${string}`);
        } else {
            setUser(null);
        }
    }, [isConnected, address]);

    const client = createWalletClient({
        chain: liskSepolia,
        transport: http(),
    });

    const publicClient = createPublicClient({
        chain: liskSepolia,
        transport: http(),
    });

    return {
        isConnected,
        client,
        walletClient,
        publicClient,
        user,
    };
};
