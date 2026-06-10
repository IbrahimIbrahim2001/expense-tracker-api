import type { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    statusCode?: number;
    success?: boolean;
}

export const errorMiddleware = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};