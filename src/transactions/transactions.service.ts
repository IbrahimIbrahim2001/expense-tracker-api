import type { CreateTransaction } from "./transactions.dto.ts";
import Transactions from "./transactions.model.ts";

class TransactionsService {
    // get all transactions 
    getAllTransactions = async (userId: string) => {
        return await Transactions.find({ user: userId });
    }

    // create new transaction
    createTransaction = async (userId: string, data: CreateTransaction) => {
        return await Transactions.create({ ...data, user: userId });
    }
}

export default new TransactionsService();