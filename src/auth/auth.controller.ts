import { type Request, type RequestHandler, type Response } from "express";
import authService from "./auth.service.ts";
import asyncHandler from "express-async-handler";
import { renderReactivationPage } from "./reactivation-page.ts";

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

    public updateUserProfile: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await authService.updateUserProfile(userId, req.body);
        res.status(200).json(result);
    });

    public deleteUserProfile: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        await authService.deleteUserProfile(userId);
        res.status(200).json({ success: true, message: "Account deleted successfully" });
    });

    public requestReactivation: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        await authService.requestReactivation(req.body.email);
        res.status(200).json({ message: "Reactivation link sent to email" });
    });

    public reactivatePage: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const token = req.params.token as string;
        let success = false;
        let message = "";

        try {
            const result = await authService.reactivate(token);
            success = result.success;
            message = result.message;
        } catch (err: any) {
            message = err.message || "Invalid or expired token.";
        }

        res.send(renderReactivationPage(success, message, process.env.EXPO_APP_URL || ""));
    });

    public changePassword: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user?.id ?? "";
        const result = await authService.changePassword(userId, req.body);
        res.status(200).json(result);
    });
}

export default new AuthController();