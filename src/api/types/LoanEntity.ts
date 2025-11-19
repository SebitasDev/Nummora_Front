import {InstallmentsList} from "@/api/types/InstallmentsList";

export interface LoanEntity {
    id: string
    loanIdBlockchain: any
    lender_id: string
    borrower_id: string
    token: string
    amount: number
    interest: number
    platform_fee: number
    installments: number
    description: string
    months: number
    tx_hash: any
    status: string
    installments_list: InstallmentsList[]
}