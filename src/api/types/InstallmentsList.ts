export interface InstallmentsList {
    id: string
    loan_id: string
    installment_number: number
    amount: number
    paid: boolean
    due_date: string
    paid_at: any
}