import mongoose from "mongoose";
import { Categories, PaymentMethods, TransactionTypes } from "./transaction.types.ts";

const transactionsSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: Categories,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: TransactionTypes,
        required: true
    },
    payment_way: {
        type: String,
        enum: PaymentMethods,
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