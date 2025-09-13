import {NummoraLoanAbi} from "@/contracts";

interface DepositNummoraLoanProps {
    stablecoinAddress: `0x${string}`;
    amount: BigInt;
    write: any
}

export const DepositNummoraLoan = async (
    { stablecoinAddress, amount, write }: DepositNummoraLoanProps) => {

    console.log(amount.toString())
    
    return await write({
        ContractAddress: process.env.NEXT_PUBLIC_NUMMUS_LOAN_CORE as `0x${string}`,
        abi: NummoraLoanAbi,
        functionName: "deposit",
        args: [
            stablecoinAddress, //Address Stablecoin
            amount //Amount
        ]
    });
}