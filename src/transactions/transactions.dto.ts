import type { TransactionType } from "./transaction.types.ts";

export interface CreateTransaction {
    category: string;
    amount: string;
    type: TransactionType;
    payement_way: string;
}