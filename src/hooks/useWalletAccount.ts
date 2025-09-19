import { useAccount, useWalletClient } from "wagmi";
import { createPublicClient, createWalletClient, http } from "viem";
import { liskSepolia } from "@reown/appkit/networks";

export const useWalletAccount = () => {
    const { isConnected, address } = useAccount();
    const { data: walletClient } = useWalletClient();

    const publicClient = createPublicClient({
        chain: liskSepolia,
        transport: http(),
    });

    return {
        isConnected,
        walletClient,
        publicClient,
        user: address,
    };
};
