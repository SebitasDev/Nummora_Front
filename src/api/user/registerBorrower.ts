import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export class RegisterBorrowerPayload {
    userAddress!: Address;
    signature!: `0x${string}`;
}

interface RegisterBorrowerResponse {
    txHash?: Address;
}

export async function registerBorrower(payload: RegisterBorrowerPayload): Promise<ApiResponse<RegisterBorrowerResponse>> {
    try {
        const { data } = await httpClient.post("/user/register-borrower", payload);
        return data as ApiResponse<RegisterBorrowerResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error register lender');
    }
}