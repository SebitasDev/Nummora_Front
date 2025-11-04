import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export class LoginPayload {
    userAddress!: Address;
    signature!: `0x${string}`;
    userRole: number = 0;
}

interface LoginResponse {
    access_token: string;
}

export async function login(payload: LoginPayload): Promise<ApiResponse<LoginResponse>> {
    try {
        console.log(payload)
        const { data } = await httpClient.post("/auth/login", payload);
        return data as ApiResponse<LoginResponse>;
    }catch (e: any){
        throw new Error(e.response?.data?.error || 'Error register lender');
    }
}