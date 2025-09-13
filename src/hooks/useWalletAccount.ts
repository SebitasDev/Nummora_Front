import { http, useAccount, useWalletClient } from "wagmi";
import {createPublicClient, createWalletClient} from "viem";
import {liskSepolia} from "@reown/appkit/networks";

export const useWalletAccount = () => {
    const { isConnected, address } = useAccount();
    const { data: walletClient } = useWalletClient();

    const client = createWalletClient({
        chain: liskSepolia,
        transport: http()
    });

    const publicClient = createPublicClient({
        chain: liskSepolia,
        transport: http()
    });

    return {
        isConnected,
        client,
        walletClient,
        publicClient,
        user: address,
    };
};