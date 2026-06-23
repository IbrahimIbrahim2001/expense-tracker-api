import Joi from "joi";
import validator from "validator";

const strongPassword = Joi.string()
    .min(8)
    .custom((value, helpers) => {
        if (!validator.isStrongPassword(value)) {
            return helpers.error("any.invalid");
        }
        return value;
    })
    .messages({
        "string.min": "Password must be at least 8 characters",
        "any.invalid": "Password must include uppercase, lowercase, number, and symbol",
    });

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: strongPassword.required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserProfileSchema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    address: Joi.string().min(3),
})

export const requestReactivationSchema = Joi.object({
    email: Joi.string().email().required(),
})

export const reactivateSchema = Joi.object({
    token: Joi.string().required(),
})

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: strongPassword.required(),
})
