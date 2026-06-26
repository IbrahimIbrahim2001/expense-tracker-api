import mongoose from "mongoose";
import Budget from "./budget.model.ts";
import Transactions from "../transactions/transactions.model.ts";
import type { CreateBudgetDto, UpdateBudgetDto } from "./budget.dto.ts";

class BudgetService {
    getAll = async (userId: string) => {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const budgets = await Budget.find({ user: userId, month, year });

        const spending = await Transactions.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                    type: "expense",
                    createdAt: {
                        $gte: new Date(year, month - 1, 1),
                        $lt: new Date(month === 12 ? year + 1 : year, month === 12 ? 0 : month, 1),
                    },
                },
            },
            {
                $group: {
                    _id: "$category",
                    spent: { $sum: "$amount" },
                },
            },
        ]);

        const spendingMap = new Map(spending.map((s) => [s._id, s.spent]));

        return budgets.map((budget) => {
            const spent = spendingMap.get(budget.category) || 0;
            return {
                id: budget._id,
                category: budget.category,
                limit: budget.limit,
                spent,
                remaining: budget.limit - spent,
                percentage: Math.min(Math.round((spent / budget.limit) * 100), 100),
            };
        });
    };

    create = async (userId: string, data: CreateBudgetDto) => {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const existing = await Budget.findOne({ user: userId, category: data.category, month, year });
        if (existing) {
            throw new Error("Budget already exists for this category this month");
        }

        return await Budget.create({ ...data, user: userId, month, year });
    };

    update = async (userId: string, budgetId: string, data: UpdateBudgetDto) => {
        return await Budget.findOneAndUpdate(
            { _id: budgetId, user: userId },
            { limit: data.limit },
            { returnDocument: "after" },
        );
    };

    delete = async (userId: string, budgetId: string) => {
        return await Budget.findOneAndDelete({ _id: budgetId, user: userId });
    };
}

export default new BudgetService();
