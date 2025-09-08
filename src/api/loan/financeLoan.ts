import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";

export class FinanceLoanPayload {
    lender!: Address;
    borrower!: Address;
    token!: Address;
    amount!: string;
    interest!: string;
    installments!: string;
    platformFee!: string;
    dataHash!: Address;
}

interface FinanceLoanResponse {
    message: string;
    transactionHash: Address;
}

export async function financeLoan(payload: FinanceLoanPayload): Promise<FinanceLoanResponse> {
    try {
        const { data } = await httpClient.post("/blockchain/loan/finance", payload);
        return data as FinanceLoanResponse;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error financing loan');
    }
}