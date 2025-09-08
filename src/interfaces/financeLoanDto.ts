import {Address} from "viem";

export class FinanceLoanDto {
    lender!: Address;
    borrower!: Address;
    token!: Address;
    amount!: bigint;
    interest!: bigint;
    installments!: bigint;
    platformFee!: bigint;
    dataHash!: Address;
}