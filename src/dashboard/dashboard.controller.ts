import { type Request, type RequestHandler, type Response } from "express";
import expressAsyncHandler from "express-async-handler";
import dashboardService from "./dashboard.service.ts";

class DashboardController {
    public getSummary: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const period = (req.query.period as string) || "all";
        const result = await dashboardService.getSummary(userId, period);
        res.status(200).json(result);
    });
}

export default new DashboardController();
