import Joi from "joi";
import { Categories, PaymentMethods } from "./transaction.types.ts";

export const createTransactionSchema = Joi.object({
    category: Joi.string().valid(...Categories).required(),
    amount: Joi.number().positive().required(),
    type: Joi.string().valid("expense", "income").required(),
    payment_way: Joi.string().valid(...PaymentMethods).required(),
});

export const updateTransactionSchema = Joi.object({
    category: Joi.string().valid(...Categories),
    amount: Joi.number().positive(),
    type: Joi.string().valid("expense", "income"),
    payment_way: Joi.string().valid(...PaymentMethods),
}).min(1).messages({
    "object.min": "At least one field must be provided for update",
});