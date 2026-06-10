import type { RegisterDto } from "./auth.dto.ts";
import AuthedUsers from "./auth.model.ts";
import { hashPassword } from "./auth.utils.ts";

class AuthService {
    register = async (data: RegisterDto) => {
        const { password } = data;
        const hashedPassword = await hashPassword(password);
        return await new AuthedUsers({
            ...data,
            password: hashedPassword
        }).save();
    }

    login = async (data: any) => {

    }
}

export default new AuthService();