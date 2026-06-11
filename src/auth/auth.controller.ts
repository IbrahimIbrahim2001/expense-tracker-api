import { type Request, type RequestHandler, type Response } from "express";
import authService from "./auth.service.ts";
import asyncHandler from "express-async-handler";

class AuthController {

    public register: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    });

    public login: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    });

    public getCurrentUser: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await authService.getCurrentUser(userId);
        res.status(200).json(result);
    });
}

export default new AuthController();