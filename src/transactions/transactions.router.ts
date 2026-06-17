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


// Get one transaction
// GET
// /api/transaction/:id
router.get("/:id", verifyToken, transactionsController.getOneTransaction);

// Create new transaction
// POST
// /api/transactions/create
router.post("/create", verifyToken, validate(createTransactionSchema), transactionsController.createTransaction);

// Update transaction
// PUT
// /api/transactions/update/:id
router.put("/update/:id", verifyToken, validate(updateTransactionSchema), transactionsController.updateTransaction);

// Delete transaction
// DELETE
// /api/transactions/delete/:id
router.delete("/delete/:id", verifyToken, transactionsController.deleteTransaction);

export default router;