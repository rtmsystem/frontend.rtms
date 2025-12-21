import type { Player } from "./playerTypes"


export type TransactionItem = {
    created_at: string
    division_name: string
    early_payment_discount: string
    id: number
    involvement_id: number
    item_total: string
    second_category_discount: string
    subscription_fee: string
    updated_at: string
}


export type Transaction = {
    amount: string
    created_at: string
    early_payment_discount: string
    id: number
    invoice_number: string
    involvement_ids: number[]
    involvements: number[]
    items: TransactionItem[]
    notes: string | null
    payment_method: string
    payment_proof: string
    payment_proof_url: string
    payment_reference: string | null
    players_info: Player
    processed_at: string | null
    processed_by: number | null
    processed_by_name: string | null
    second_category_discount: string
    status: string
    subscription_fee: string
    subtotal: string
    total_discount: string
    transaction_id: number | null
    updated_at: string
}

