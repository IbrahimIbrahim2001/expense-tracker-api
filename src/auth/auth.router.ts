import { Router } from "express";
import AuthController from "./auth.controller.ts";
import { validate } from "../../middleware/validation.ts";
import { changePasswordSchema, loginSchema, registerSchema, requestReactivationSchema, updateUserProfileSchema } from "./auth.validation.ts";
import { verifyToken } from "../../middleware/verifyToken.ts";
import { upload } from "../../config/multer.ts";

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

// Delete user
// DELETE
// /api/auth/delete-user
router.delete("/delete-user", verifyToken, AuthController.deleteUserProfile);

// Request account reactivation
// POST
// /api/auth/request-reactivation
router.post("/request-reactivation", validate(requestReactivationSchema), AuthController.requestReactivation);

// Reactivate page (clickable email link)
// GET
// /api/auth/reactivate/:token
router.get("/reactivate/:token", AuthController.reactivatePage);

// Change password
// PUT
// /api/auth/change-password
router.put("/change-password", verifyToken, validate(changePasswordSchema), AuthController.changePassword);

// Upload avatar
// PUT
// /api/auth/upload-avatar
router.put("/upload-avatar", verifyToken, upload.single("avatar"), AuthController.uploadAvatar);

export default router;