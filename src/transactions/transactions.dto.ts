import type { Category, PaymentMethod, TransactionType } from "./transaction.types.ts";

export interface CreateTransaction {
    category: Category;
    amount: number;
    type: TransactionType;
    payment_way: PaymentMethod;
}

export interface UpdateTransaction {
    category?: Category;
    amount?: number;
    type?: TransactionType;
    payment_way?: PaymentMethod;
}