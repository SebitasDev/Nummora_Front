import {NummoraLoanAbi} from "@/contracts";
import {NUMMORA_CORE_ADDRESS} from "@/Common/envairoments";

interface DepositNummoraLoanProps {
    stablecoinAddress: `0x${string}`;
    amount: BigInt;
    write: any
}

export const DepositNummoraLoan = async (
    { stablecoinAddress, amount, write }: DepositNummoraLoanProps) => {

    console.log(amount.toString())
    
    return await write({
        ContractAddress: NUMMORA_CORE_ADDRESS,
        abi: NummoraLoanAbi,
        functionName: "deposit",
        args: [
            stablecoinAddress, //Address Stablecoin
            amount //Amount
        ]
    });
}