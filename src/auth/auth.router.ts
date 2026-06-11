import { Router } from "express";
import AuthController from "./auth.controller.ts";
import { validate } from "../../middleware/validation.ts";
import { registerSchema } from "./auth.validation.ts";
import { verifyToken } from "../../middleware/verifyToken.ts";

const router: Router = Router();

// Register new user
// POST
// /api/auth/register
router.post("/register", validate(registerSchema), AuthController.register);

// login user
// POST
// /api/auth/login
router.post("/login", AuthController.login);

// get current user
// GET
// /api/auth/current-user
router.get("/current-user", verifyToken, AuthController.getCurrentUser);

export default router;