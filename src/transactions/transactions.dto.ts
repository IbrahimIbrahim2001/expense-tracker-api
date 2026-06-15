import type { Category, PaymentMethod, TransactionType } from "./transaction.types.ts";

export interface CreateTransaction {
    category: Category;
    amount: number;
    type: TransactionType;
    payement_way: PaymentMethod;
}