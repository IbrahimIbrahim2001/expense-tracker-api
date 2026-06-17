import { Router } from "express";
import AuthController from "./auth.controller.ts";
import { validate } from "../../middleware/validation.ts";
import { loginSchema, registerSchema, updateUserProfileSchema } from "./auth.validation.ts";
import { verifyToken } from "../../middleware/verifyToken.ts";

const router: Router = Router();

// Register new user
// POST
// /api/auth/register
router.post("/register", validate(registerSchema), AuthController.register);

// Login user
// POST
// /api/auth/login
router.post("/login", validate(loginSchema), AuthController.login);

// Get current user
// GET
// /api/auth/current-user
router.get("/current-user", verifyToken, AuthController.getCurrentUser);

// Update user profile
// PUT
// /api/auth/update-profile
router.put("/update-profile", verifyToken, validate(updateUserProfileSchema), AuthController.updateUserProfile);

export default router;