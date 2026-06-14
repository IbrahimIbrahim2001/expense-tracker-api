import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.ts";
import transactionsController from "./transactions.controller.ts";

const router: Router = Router();

// Get all transactions
// GET
// /api/transactions
router.get("/", verifyToken, transactionsController.getAll);

export default router;