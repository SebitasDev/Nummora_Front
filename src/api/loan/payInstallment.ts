import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";
import {Address} from "viem";

export class PayInstallmentPayload {
    loanId!: string;
    signature!: `0x${string}`;
}

interface FinanceLoanResponse {
    txHash?: Address;
}

export async function payInstallment(payload: PayInstallmentPayload): Promise<ApiResponse<FinanceLoanResponse>> {
    try {
        const { data } = await httpClient.post("/loan/pay-installment", payload);
        return data as ApiResponse<FinanceLoanResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error pay installment');
    }
}