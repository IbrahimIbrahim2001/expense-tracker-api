import { type Request, type RequestHandler, type Response } from "express";
import expressAsyncHandler from "express-async-handler"
import transactionsService from "./transactions.service.ts";

class TransactionsController {
    public getAll: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await transactionsService.getAllTransactions(userId);
        res.status(200).json(result);
    })
}


export default new TransactionsController();