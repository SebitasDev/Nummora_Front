import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";
import {ApiResponse} from "@/api/common/interface/genericResponse";

export interface TemporalLoansResponse {
    id: string;
    borrower_id: string;
    amount: number;
    description: string;
    months: number;
    installments: number;
    token: Address;
}

export async function temporalLoans(): Promise<ApiResponse<TemporalLoansResponse[]>> {
    try {
        const { data } = await httpClient.get<ApiResponse<TemporalLoansResponse[]>>("/loan/requests");
        return data;
    } catch (error: any) {
        console.error("Error fetching temporal loans:", error);
        throw new Error(error.response?.data?.message || "Error fetching temporal loans");
    }
}