export interface RegisterDto {
    username: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UpdateUserProfileDto {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    avatar?: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}