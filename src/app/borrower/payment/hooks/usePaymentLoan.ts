import {GenerateLoanResponse, getPendingBorrowerLoan} from "@/api/loan/getPendingBorrowerLoan";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {useEffect, useState} from "react";

export const usePaymentLoan = ()=> {
    const { user } = useWalletAccount();
    const [pendingLoan, setPendingLoan] = useState<GenerateLoanResponse | undefined>();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await getPendingBorrowerLoan(user!);
                console.log(data!.data)
                setPendingLoan(data!.data);
            } catch (error) {
                console.error("Error fetching pending loan:", error);
            }
        };
        fetchLoans();
    }, []);

    return {
        pendingLoan
    }
}