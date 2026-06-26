import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.ts";
import { validate } from "../../middleware/validation.ts";
import budgetController from "./budget.controller.ts";
import { createBudgetSchema, updateBudgetSchema } from "./budget.validation.ts";

const router: Router = Router();

// Get all budgets (current month)
// GET
// /api/budget
router.get("/", verifyToken, budgetController.getAll);

// Create budget
// POST
// /api/budget/create
router.post("/create", verifyToken, validate(createBudgetSchema), budgetController.create);

// Update budget
// PUT
// /api/budget/update/:id
router.put("/update/:id", verifyToken, validate(updateBudgetSchema), budgetController.update);

// Delete budget
// DELETE
// /api/budget/delete/:id
router.delete("/delete/:id", verifyToken, budgetController.delete);

export default router;
