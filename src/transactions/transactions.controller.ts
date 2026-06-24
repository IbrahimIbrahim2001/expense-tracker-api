import { type Request, type RequestHandler, type Response } from "express";
import expressAsyncHandler from "express-async-handler"
import transactionsService from "./transactions.service.ts";

class TransactionsController {
    public getAll: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const cursor = req.query.cursor ? String(req.query.cursor) : undefined;
        const result = await transactionsService.getAllTransactions(userId, limit, cursor);
        res.status(200).json(result);
    })

    public getOneTransaction: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const transactionId = req.params.id as string;
        const result = await transactionsService.getTransaction(userId, transactionId);
        res.status(200).json(result);
    })

    public createTransaction: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await transactionsService.createTransaction(userId, req.body);
        res.status(201).json(result);
    })

    public updateTransaction: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const transactionId = req.params.id as string;
        const result = await transactionsService.updateTransaction(userId, transactionId, req.body);
        res.status(200).json(result);
    })

    public deleteTransaction: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const transactionId = req.params.id as string;
        const result = await transactionsService.deleteTransaction(userId, transactionId);
        res.status(200).json(result);
    })
}


export default new TransactionsController();