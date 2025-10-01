import { useWalletAccount } from "@/hooks/useWalletAccount";
import {Address} from "viem";

export const useWalletAuth = () => {
  const { isConnected, user, walletClient } = useWalletAccount();

  const signMessage = async (message: string) => {
    if (!walletClient || !user) {
      throw new Error("Wallet not connected");
    }

    const signature = await walletClient.signMessage({
      account: walletClient.account,
      message,
    });

    return { signature, user: user as Address };
  };

  return { isConnected, account: user, signMessage };
};
