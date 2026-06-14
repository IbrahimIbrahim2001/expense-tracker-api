import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.ts";
import transactionsController from "./transactions.controller.ts";

const router: Router = Router();

// Get all transactions
// GET
// /api/transactions
router.get("/", verifyToken, transactionsController.getAll);

// Create new transaction
// POST
// /api/transactions/create
router.post("/create", verifyToken, transactionsController.createTransaction);

export default router;