import { useAccount, useWalletClient } from "wagmi";
import { createPublicClient, http } from "viem";
import {celo} from "@reown/appkit/networks";

export const useWalletAccount = () => {
    const { isConnected, address } = useAccount();
    const { data: walletClient } = useWalletClient();

    const publicClient = createPublicClient({
        chain: celo,
        transport: http(),
    });

    return {
        isConnected,
        walletClient,
        publicClient,
        user: address,
    };
};
