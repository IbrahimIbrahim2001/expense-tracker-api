import mongoose from "mongoose";
import Transactions from "../transactions/transactions.model.ts";
import { getDateRange } from "./dashboard.utils.ts";

class DashboardService {
    getSummary = async (userId: string, period: string) => {
        const startDate = getDateRange(period);
        const match: Record<string, unknown> = { user: new mongoose.Types.ObjectId(userId) };
        if (startDate) match.createdAt = { $gte: startDate };

        const result = await Transactions.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
        ]);

        const income = result.find((r) => r._id === "income")?.total || 0;
        const expense = result.find((r) => r._id === "expense")?.total || 0;

        return {
            period,
            income,
            expense,
            balance: income - expense,
            totalTransactions: result.reduce((sum, r) => sum + r.count, 0),
        };
    };
}

export default new DashboardService();
