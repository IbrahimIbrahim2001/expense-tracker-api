import mongoose from "mongoose";
import { TransactionTypes } from "./transaction.types.ts";

const transactionsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: TransactionTypes,
        required: true
    },
    payement_way: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuthedUsers",
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Transactions = mongoose.model("transactions", transactionsSchema);

export default Transactions;