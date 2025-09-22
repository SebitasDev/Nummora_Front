import {useWalletAccount} from "@/hooks/useWalletAccount";
import {registerLender} from "@/api/user/registerLender";
import {encodePacked, keccak256, toBytes} from "viem";
import {toast} from "react-toastify";
import {registerBorrower} from "@/api/user/registerBorrower";
import {UserRoles} from "@/enums/UserRoles";

export const useRegister = () => {
    const { walletClient } = useWalletAccount();

    //TODO: Refactorizar
    const registerWithLenderSignature = async (): Promise<`0x${string}`> => {
        if (!walletClient?.account) throw new Error("Wallet not connected");

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
        if (!walletClient?.account) throw new Error("Wallet not connected");

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
                userAddress: walletClient!.account.address,
            });

            toast.success(response.message);
            return response;
        } catch (e: any) {
            toast.error("❌ Error al registrar como lender: " + (e?.message ?? "Error desconocido"));
            return { success: false, error: e?.message ?? "Error desconocido" };
        }
    };

    const registerBorrowerSignature = async () => {
        try {
            const signature = await registerWithBorrowerSignature();
            const response = await registerBorrower({
                signature,
                userAddress: walletClient!.account.address,
            });

            toast.success(response.message);
            return response;
        } catch (e: any) {
            toast.error("❌ Error al registrar como borrower: " + (e?.message ?? "Error desconocido"));
            return { success: false, error: e?.message ?? "Error desconocido" };
        }
    };
    
    const onRegisterUser = async (userRole: number) => {
        if (userRole === UserRoles.Lender){
            return await registerLenderSignature();
        }else {
            return await registerBorrowerSignature();
        }
    }
    
    return {
        onRegisterUser
    }
}