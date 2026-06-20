import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
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