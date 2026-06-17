import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.ts";
import transactionsController from "./transactions.controller.ts";
import { validate } from "../../middleware/validation.ts";
import { createTransactionSchema, updateTransactionSchema } from "./transaction.validation.ts";

const router: Router = Router();

// Get all transactions
// GET
// /api/transactions
router.get("/", verifyToken, transactionsController.getAll);

// Create new transaction
// POST
// /api/transactions/create
router.post("/create", verifyToken, validate(createTransactionSchema), transactionsController.createTransaction);

router.put("/update/:id", verifyToken, validate(updateTransactionSchema), transactionsController.updateTransaction);

export default router;