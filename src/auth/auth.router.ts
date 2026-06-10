import { Router } from "express";
import AuthController from "./auth.controller.ts";
import { validate } from "../../middleware/validation.ts";
import { registerSchema } from "./auth.validation.ts";

const router: Router = Router();

// Register new user
// /api/auth/register
router.post("/register", validate(registerSchema), AuthController.register);

// login user
// /api/auth/login
router.post("/login", AuthController.login);

export default router;