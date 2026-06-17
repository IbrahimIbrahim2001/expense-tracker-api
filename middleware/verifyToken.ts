import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthedUsers from "../src/auth/auth.model.ts";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No token, authorization denied"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
            id: string;
            email?: string;
        };

        const user = await AuthedUsers.findById(decoded.id).select("isActive");
        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "Account is deactivated"
            });
        }

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired"
        });
    }
};