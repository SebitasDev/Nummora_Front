import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/lib/zod/authShema";
import {LoginFormData} from "@/types";
import {useRouter} from "next/navigation";
import {UserRoles} from "@/enums/UserRoles";
import {useWalletAccount} from "@/hooks/useWalletAccount";

export const useLogin = () => {

    const { isConnected, user, client } = useWalletAccount();
    
    const { push } = useRouter();
    
    const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema)
    })
    
    const onSubmit = async (data: LoginFormData) => {
        if (parseInt(data.role) === UserRoles.Lender)
        {
            if (!client || !user) {
                throw new Error("Wallet not connected");
            }
            
            /*const balance = await write<bigint>({
                ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_TOKEN_ADDRESS as `0x${string}`,
                abi: NummusTokenAbi,
                functionName: "balanceOf",
                args: [user]
            });*/

            
            push('/lender/dashboard');
        }
        else 
            push('/borrower/dashboard');
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