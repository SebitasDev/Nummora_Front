import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/lib/zod/authShema";
import {LoginFormData} from "@/types";
import {useAccount} from "wagmi";
import {useRouter} from "next/navigation";
import {UserRoles} from "@/enums/UserRoles";

export const useLogin = () => {

    const { isConnected, address } = useAccount();
    const { push } = useRouter();
    
    const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema)
    })

    const onSubmit = (data: LoginFormData) => {
        if (parseInt(data.role) === UserRoles.Lender)
            push('/lender/dashboard');
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
        address
    }
}