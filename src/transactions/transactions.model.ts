import mongoose from "mongoose";

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