import Joi from "joi";
import { Categories } from "../transactions/transaction.types.ts";

export const createBudgetSchema = Joi.object({
    category: Joi.string()
        .valid(...Categories)
        .required(),
    limit: Joi.number().min(1).required(),
});

export const updateBudgetSchema = Joi.object({
    limit: Joi.number().min(1).required(),
});
