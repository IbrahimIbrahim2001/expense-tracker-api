import Transactions from "./transactions.model.ts";

class TransactionsService {
    // get all transactions 
    getAllTransactions = async (userId: string) => {
        return await Transactions.find({ user: userId });
    }
}

export default new TransactionsService();