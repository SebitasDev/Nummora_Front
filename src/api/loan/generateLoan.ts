import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export class GenerateLoanPayload {
    borrowerAddress!: Address;
    amount!: number;
    token!: Address;
    installments!: number;
    months!: number;
    description?: string;
}

interface GenerateLoanResponse {
    txHash?: Address | null;
}

export async function generateLoan(payload: GenerateLoanPayload): Promise<ApiResponse<GenerateLoanResponse>> {
    try {
        const { data } = await httpClient.post("/loan/generate", payload);
        return data as ApiResponse<GenerateLoanResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error to generate loan');
    }
}