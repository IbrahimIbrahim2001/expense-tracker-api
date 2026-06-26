import mongoose from "mongoose";
import { Categories } from "../transactions/transaction.types.ts";

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authedUsers",
        required: true,
    },
    category: {
        type: String,
        enum: Categories,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
        min: 1,
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    year: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

budgetSchema.index({ user: 1, month: 1, year: 1 });

const Budget = mongoose.model("budgets", budgetSchema);

export default Budget;
