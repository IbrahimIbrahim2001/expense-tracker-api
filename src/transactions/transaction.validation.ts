import Joi from "joi";
import { Categories, PaymentMethods } from "./transaction.types.ts";

export const createTransactionSchema = Joi.object({
    category: Joi.string().valid(...Categories).required(),
    amount: Joi.number().positive().required(),
    type: Joi.string().valid("expense", "income").required(),
    payment_way: Joi.string().valid(...PaymentMethods).required(),
});