import {Address} from "viem";
import httpClient from "@/api/utils/httpClient";

export interface TemporalLoansResponse {
    id: string;
    borrower_id: string;
    amount: number;
    description: string;
    months: number;
    installments: number;
    token: Address;
}

export async function temporalLoans(): Promise<TemporalLoansResponse[]> {
    try {
        const { data } = await httpClient.get<TemporalLoansResponse[]>("/loan/requests");
        return data;
    } catch (error: any) {
        console.error("Error fetching temporal loans:", error);
        throw new Error(error.response?.data?.message || "Error fetching temporal loans");
    }
}