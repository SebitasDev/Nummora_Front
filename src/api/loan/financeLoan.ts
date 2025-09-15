import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export class FinanceLoanPayload {
    lenderAddress!: Address;
    loanId!: string;
    dataHash!: Address;
}

interface FinanceLoanResponse {
    txHash?: Address;
}

export async function financeLoan(payload: FinanceLoanPayload): Promise<ApiResponse<FinanceLoanResponse>> {
    try {
        const { data } = await httpClient.post("/loan/finance", payload);
        return data as ApiResponse<FinanceLoanResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error financing loan');
    }
}