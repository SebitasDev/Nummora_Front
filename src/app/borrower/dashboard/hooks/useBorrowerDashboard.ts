import {contractRead} from "@/utilities";
import {NummoraLoanAbi} from "@/contracts";
import {useState} from "react";
import {parseEther} from "viem";
import {useContractWrite} from "@/hooks/useContractWrite";

interface Loan {
    active: boolean;
    amount: bigint;
    borrower: `0x${string}`;
    installmentAmount: bigint;
    installments: number;
    installmentsPaid: number;
    lender: `0x${string}`;
    stablecoin: `0x${string}`;
    startTime: number;
    totalPaid: bigint;
    totalToPay: bigint;
    platformFee: bigint;
}

export const useBorrowerDashboard = () => {
    
    const read = contractRead();
    const { write } = useContractWrite();
    const [ loan, setLoan ] = useState<Loan | null>(null);
    
    const searchLoanById = async (id: BigInt) => {
        const searchLoan = await read<Loan>({
            ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
            abi: NummoraLoanAbi,
            functionName: "getLoan",
            args: [
                id // Loan ID
            ]
        })
        
        setLoan(searchLoan);
    }
    
    const payInstallment = async (loanId: BigInt) => {
        await write({
            ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
            abi: NummoraLoanAbi,
            functionName: "payInstallment",
            args: [
                loanId, //Loan Id
            ]
        });
    }   

    const payEarly = async (loanId: BigInt) => {
        await write({
            ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
            abi: NummoraLoanAbi,
            functionName: "payEarly",
            args: [
                loanId, //Loan Id
            ]
        });
        await searchLoanById(loanId);
    }
    
    return {
        searchLoanById,
        loan,
        payInstallment,
        payEarly
    }
}