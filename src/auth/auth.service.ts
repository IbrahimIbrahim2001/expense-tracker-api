import jwt from "jsonwebtoken";
import type { LoginDto, RegisterDto, UpdateUserProfileDto } from "./auth.dto.ts";
import AuthedUsers from "./auth.model.ts";
import { comparePassword, hashPassword } from "./auth.utils.ts";
import mailService from "../mail/mail.service.ts";

class AuthService {
    // Register
    register = async (data: RegisterDto) => {
        const { email } = data;
        const user = await AuthedUsers.findOne({ email });

        if (user && !user.isActive) {
            throw new Error("Account is deactivated");
        }

        if (user) {
            throw new Error("Account already exists try to Login");
        }

        const { password } = data;
        const hashedPassword = await hashPassword(password);
        return await new AuthedUsers({
            ...data,
            password: hashedPassword
        }).save();
    }

    // Login
    login = async (data: LoginDto) => {
        const { email } = data;
        const user = await AuthedUsers.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.isActive) {
            throw new Error("Account is deactivated");
        }

        const isPasswordMatch = await comparePassword(data.password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid credentials");
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "7d",
            }
        );
        const { password, ...userObj } = user.toObject();
        return { user: userObj, token };
    }

    // Get current user
    getCurrentUser = async (id: string) => {
        const user = await AuthedUsers.findById(id);
        if (!user) {
            throw new Error("User not found");
        }

        const { password, ...userObj } = user.toObject();
        return userObj;
    }

    // Update user profile
    updateUserProfile = async (id: string, data: UpdateUserProfileDto) => {
        const user = await AuthedUsers.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return await AuthedUsers.findOneAndUpdate({ _id: id }, data, { returnDocument: "after" });
    }

    // Request reactivation
    requestReactivation = async (email: string) => {
        const user = await AuthedUsers.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isActive) {
            throw new Error("Account is already active");
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "5m" });

        await mailService.sendReactivationLink(email, token);
    }

    // Reactivate account
    reactivate = async (token: string) => {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };

        const user = await AuthedUsers.findOne({ email: payload.email });
        if (!user) {
            throw new Error("User not found");
        }

        if (user.isActive) {
            throw new Error("Account is already active");
        }

        user.isActive = true;
        user.deletedAt = null;
        await user.save();

        return { success: true, message: "Account reactivated successfully" };
    }

    // Delete user
    deleteUserProfile = async (id: string) => {
        const user = await AuthedUsers.findByIdAndUpdate(
            id,
            { isActive: false, deletedAt: new Date() },
            { returnDocument: "after" }
        );
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}

export default new AuthService();