import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";
import {LoanEntity} from "@/api/types/LoanEntity";

export interface GenerateLoanResponse {
    data?: LoanEntity | null;
}

export async function getPendingBorrowerLoan(userAddress: Address): Promise<ApiResponse<LoanEntity>> {
    try {
        const { data } = await httpClient.get(`/loan/borrower-pending/${userAddress}`);
        return data as ApiResponse<LoanEntity>;
    } catch (e: any) {
        throw new Error(e.response?.data?.error || 'Error to get pending loan');
    }
}