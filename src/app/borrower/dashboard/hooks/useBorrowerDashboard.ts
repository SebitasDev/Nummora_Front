import {contractRead} from "@/utilities";
import {NummoraLoanAbi} from "@/contracts";
import {useState} from "react";
import {createWalletClient, encodePacked, keccak256, toBytes} from "viem";
import {useContractWrite} from "@/hooks/useContractWrite";
import {useWalletAccount} from "@/hooks/useWalletAccount";
import {privateKeyToAccount} from "viem/accounts";
import {liskSepolia} from "@reown/appkit/networks";
import {http} from "wagmi";
import {payInstallment} from "@/api/loan/payInstallment";

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
    const { walletClient } = useWalletAccount();

    const ownerAccount = privateKeyToAccount(
        "0x68c00c5244b677a8a518d5b6e48e3d2d2c60671a237477e374ab087d77191864"
    );

    const ownerClient = createWalletClient({
        account: ownerAccount,
        chain: liskSepolia,
        transport: http(),
    });
    
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
    
    const payInstallmentV2 = async (loanId: BigInt) => {
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

    // 🔹 Borrower firma la cuota
    const signInstallment = async (
        loanBlockchainId: bigint,
        amount: bigint
    ): Promise<`0x${string}`> => {
        if (!walletClient?.account) throw new Error("Wallet not connected");

        const messageHash = keccak256(
            encodePacked(
                ["address", "uint256", "uint256"],
                [
                    process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
                    loanBlockchainId,
                    amount
                ]
            )
        );
        return await walletClient.signMessage({
            account: walletClient.account,
            message: {raw: toBytes(messageHash)},
        });
    };
    
    const payInstallmentSignature = async (
        loanBlockchainId: bigint, 
        loanId: string,
        amount: bigint
    ) => {
        const signature = await signInstallment(loanBlockchainId, amount)
        
        const response = await payInstallment({
            signature: signature,
            loanId: loanId
        })

        console.log("✅ Cuota pagada con firma del borrower", response);
        
        return response;
    }
    
    return {
        searchLoanById,
        loan,
        payInstallment: payInstallmentV2,
        payEarly,
        signInstallment,
        payInstallmentSignature
    }
}