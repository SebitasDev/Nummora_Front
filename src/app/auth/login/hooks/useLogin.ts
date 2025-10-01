import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/zod/authShema";
import { LoginFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useWalletAuth } from "@/app/auth/hooks/useWalletAccount";
import { login } from "@/api/auth/login";
import { UserRoles } from "@/enums/UserRoles";
import {useWalletAccount} from "@/hooks/useWalletAccount";

export const useLogin = () => {
  const { push } = useRouter();
  const { isConnected, account } = useWalletAuth();
  const { walletClient, user } = useWalletAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (role: number) => {
    try {
      if (!walletClient || !user) {
        throw new Error("Wallet not connected");
      }
      
      const message = "Login to Nummora";

      const signature = await walletClient.signMessage({
        account: walletClient.account,
        message,
      });

      const response = await login({
        userAddress: user,
        signature,
        userRole: role,
      });
      console.log("Login response:", response);

      if (response.success) {
        localStorage.setItem("authToken", response.data!.access_token)
        role === UserRoles.Lender
          ? push("/lender/dashboard")
          : push("/borrower/dashboard");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    onSubmit,
    isConnected,
    account,
  };
};
