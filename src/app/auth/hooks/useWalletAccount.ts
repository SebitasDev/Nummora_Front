import { useWalletAccount } from "@/hooks/useWalletAccount";
import {Address, hexToBytes, toBytes} from "viem";

export const useWalletAuth = () => {
  const { isConnected, user, walletClient } = useWalletAccount();

  const signMessage = async (message: `0x${string}`) => {
    if (!walletClient || !user) {
      throw new Error("Wallet not connected");
    }
    const signature = await walletClient.signMessage({
      account: walletClient.account,
      message: { raw: hexToBytes(message) },
    });
    return { signature, user: user as Address };
  };

  return { isConnected, account: user, signMessage };
};
