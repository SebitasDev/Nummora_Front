import { registerLender } from "@/api/user/registerLender";
import { registerBorrower } from "@/api/user/registerBorrower";
import { encodePacked, keccak256, toBytes } from "viem";
import { toast } from "react-toastify";
import { UserRoles } from "@/enums/UserRoles";
import { useWalletAuth } from "@/app/auth/hooks/useWalletAccount";
import { useForm } from "react-hook-form";
import { LoginFormData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/zod/authShema";
import {useWalletAccount} from "@/hooks/useWalletAccount";

export const useRegister = () => {
  const { account, signMessage } = useWalletAuth();
  const { walletClient } = useWalletAccount();

  const {
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const registerWithLenderSignature = async (): Promise<`0x${string}`> => {
    if (!account || !walletClient) throw new Error("Wallet not connected");

    const messageHash = keccak256(
        encodePacked(
            ["address", "string"],
            [
              process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
              "registerLender"
            ]
        )
    );

    return await walletClient.signMessage({
      account: walletClient.account,
      message: {raw: toBytes(messageHash)},
    });
  };

  const registerWithBorrowerSignature = async (): Promise<`0x${string}`> => {
    if (!account || !walletClient) throw new Error("Wallet not connected");

    const messageHash = keccak256(
        encodePacked(
            ["address", "string"],
            [
              process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
              "registerBorrower"
            ]
        )
    );

    return await walletClient.signMessage({
      account: walletClient.account,
      message: {raw: toBytes(messageHash)},
    });
  };

  const registerLenderSignature = async () => {
    try {
      const signature = await registerWithLenderSignature();
      const response = await registerLender({
        signature,
        userAddress: account!,
      });

      toast.success(response.message);
      return response;
    } catch (e: any) {
      toast.error(
        "❌ Error al registrar como lender: " +
          (e?.message ?? "Error desconocido")
      );
      return { success: false, error: e?.message ?? "Error desconocido" };
    }
  };

  const registerBorrowerSignature = async () => {
    try {
      const signature = await registerWithBorrowerSignature();
      const response = await registerBorrower({
        signature,
        userAddress: account!,
      });

      toast.success(response.message);
      return response;
    } catch (e: any) {
      toast.error(
        "❌ Error al registrar como borrower: " +
          (e?.message ?? "Error desconocido")
      );
      return { success: false, error: e?.message ?? "Error desconocido" };
    }
  };

  const onRegisterUser = async (userRole: number) => {
    if (userRole === UserRoles.Lender) {
      return await registerLenderSignature();
    } else {
      return await registerBorrowerSignature();
    }


  };

  return {
    onRegisterUser,
    errors,
    control,
  };
};
