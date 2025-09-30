import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/zod/authShema";
import { LoginFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useWalletAuth } from "@/app/auth/hooks/useWalletAccount";
import { login } from "@/api/auth/login";
import { UserRoles } from "@/enums/UserRoles";

export const useLogin = () => {
  const { push } = useRouter();
  const { isConnected, account, signMessage } = useWalletAuth();

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
      const { signature, user } = await signMessage("Login to Nummora");

      const response = await login({
        userAddress: user,
        signature,
        userRole: role,
      });
      console.log("Login response:", response);

      if (response.success) {
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
