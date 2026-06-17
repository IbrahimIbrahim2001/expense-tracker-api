import type { LoginDto, RegisterDto, UpdateUserProfileDto } from "./auth.dto.ts";
import AuthedUsers from "./auth.model.ts";
import { comparePassword, hashPassword } from "./auth.utils.ts";
import jwt from "jsonwebtoken";

class AuthService {
    // Register
    register = async (data: RegisterDto) => {
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
}

export default new AuthService();