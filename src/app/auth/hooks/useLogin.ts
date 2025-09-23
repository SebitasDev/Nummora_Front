import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/lib/zod/authShema";
import {LoginFormData} from "@/types";
import {useRouter} from "next/navigation";
import {UserRoles} from "@/enums/UserRoles";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {Address, encodePacked, keccak256, toBytes} from "viem";
import {login} from "@/api/auth/login";

export const useLogin = () => {

    const { isConnected, user, walletClient } = useWalletAccount();
    
    const { push } = useRouter();
    
    const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema)
    })
    
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
                userAddress: user as Address,
                signature,
                userRole: role,
            });

            if (response.success){
                localStorage.setItem("authToken", response.data!.access_token);
                role === UserRoles.Lender ? push('/lender/dashboard') 
                    : push('/borrower/dashboard');
            }
        }catch (e) {
            console.log(e);
        }
    }
    
    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        control,
        isConnected,
        account: user
    }
}