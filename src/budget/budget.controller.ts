import { type Request, type RequestHandler, type Response } from "express";
import asyncHandler from "express-async-handler";
import budgetService from "./budget.service.ts";

class BudgetController {
    public getAll: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await budgetService.getAll(userId);
        res.status(200).json(result);
    });

    public create: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await budgetService.create(userId, req.body);
        res.status(201).json(result);
    });

    public update: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const budgetId = req.params.id as string;
        const result = await budgetService.update(userId, budgetId, req.body);
        res.status(200).json(result);
    });

    public delete: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const budgetId = req.params.id as string;
        await budgetService.delete(userId, budgetId);
        res.status(200).json({ message: "Budget deleted" });
    });
}

export default new BudgetController();
