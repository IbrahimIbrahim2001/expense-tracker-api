import type { Category } from "../transactions/transaction.types.ts";

export interface CreateBudgetDto {
    category: Category;
    limit: number;
}

export interface UpdateBudgetDto {
    limit: number;
}
