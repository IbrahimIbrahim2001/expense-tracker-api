import type { CreateTransaction } from "./transactions.dto.ts";
import Transactions from "./transactions.model.ts";

class TransactionsService {
    // get all transactions 
    getAllTransactions = async (userId: string, limit?: number) => {
        const query = Transactions.find({ user: userId }).sort({ createdAt: -1 });
        if (limit !== undefined) query.limit(limit);
        return await query
    }

    // create new transaction
    createTransaction = async (userId: string, data: CreateTransaction) => {
        const incomeOnly = ["salary"];

        if (incomeOnly.includes(data.category) && data.type === "expense") {
            throw new Error(`${data.category} cannot be an expense`);
        }

        return await Transactions.create({ ...data, user: userId });
    }
}

export default new TransactionsService();