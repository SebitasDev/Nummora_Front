import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export class RegisterLenderPayload {
    userAddress!: Address;
    signature!: `0x${string}`;
}

interface RegisterLenderResponse {
    txHash?: Address;
}

export async function registerLender(payload: RegisterLenderPayload): Promise<ApiResponse<RegisterLenderResponse>> {
    try {
        console.log(payload.userAddress)
        const { data } = await httpClient.post("/user/register-lender", payload);
        return data as ApiResponse<RegisterLenderResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error register lender');
    }
}