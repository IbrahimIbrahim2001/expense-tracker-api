import type { CreateTransaction, UpdateTransaction } from "./transactions.dto.ts";
import Transactions from "./transactions.model.ts";

class TransactionsService {
    // get all transactions 
    getAllTransactions = async (userId: string, limit?: number) => {
        const query = Transactions.find({ user: userId }).sort({ createdAt: -1 });
        if (limit !== undefined) query.limit(limit);
        return await query
    }

    // get one transaction
    getTransaction = async (userId: string, transactionId: string) => {
        return await Transactions.findOne({ _id: transactionId, user: userId });
    }

    // create new transaction
    createTransaction = async (userId: string, data: CreateTransaction) => {
        const incomeOnly = ["salary"];

        if (incomeOnly.includes(data.category) && data.type === "expense") {
            throw new Error(`${data.category} cannot be an expense`);
        }

        return await Transactions.create({ ...data, user: userId });
    }

    // update transaction 
    updateTransaction = async (userId: string, transactionId: string, data: UpdateTransaction) => {
        const incomeOnly = ["salary"];

        if (data.category && incomeOnly.includes(data.category) && data.type === "expense") {
            throw new Error(`${data.category} cannot be an expense`);
        }

        return await Transactions.findOneAndUpdate({ _id: transactionId, user: userId }, data, { returnDocument: "after" });
    }

    // delete transaction
    deleteTransaction = async (userId: string, transactionId: string) => {
        return await Transactions.findOneAndDelete({ _id: transactionId, user: userId });
    }
}

export default new TransactionsService();