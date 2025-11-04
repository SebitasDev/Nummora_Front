import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export class InvestPayload {
    amount!: number;
    userAddress!: Address;
    tokenAddress!: Address;
    signature!: `0x${string}`
}

interface InvestResponse {
    newCapital?: number;
}

export async function invest(payload: InvestPayload): Promise<ApiResponse<InvestResponse>> {
    try {
        const { data } = await httpClient.post("/investment", payload);
        return data as ApiResponse<InvestResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error financing loan');
    }
}