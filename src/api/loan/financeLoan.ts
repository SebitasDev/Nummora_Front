import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";

export class FinanceLoanPayload {
    lenderAddress!: Address;
    temporalLoanId!: string;
    dataHash!: Address;
}

interface FinanceLoanResponse {
    message: string;
    transactionHash: Address;
}

export async function financeLoan(payload: FinanceLoanPayload): Promise<FinanceLoanResponse> {
    try {
        console.log(payload);
        const { data } = await httpClient.post("/loan/finance", payload);
        return data as FinanceLoanResponse;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error financing loan');
    }
}