import { useWalletAccount } from "@/hooks/useWalletAccount";
import {Address, hexToBytes, toBytes} from "viem";

export const useWalletAuth = () => {
  const { isConnected, user, walletClient } = useWalletAccount();

  const signMessage = async (message: string | `0x${string}`) => {
    if (!walletClient || !user) {
      throw new Error("Wallet not connected");
    }

    let signature: `0x${string}`;

    if (message.startsWith("0x")) {
      signature = await walletClient.signMessage({
        account: walletClient.account,
        message: { raw: hexToBytes(message as `0x${string}`) },
      });
    } else {
      signature = await walletClient.signMessage({
        account: walletClient.account,
        message,
      });
    }

    return { signature, user: user as Address };
  };

  return { isConnected, account: user, signMessage };
};
