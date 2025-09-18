import {Address} from "viem";

export class FinanceLoanDto {
    loanId!: string;
    lender!: Address;
    dataHash!: Address;
}