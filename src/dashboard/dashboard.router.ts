import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.ts";
import dashboardController from "./dashboard.controller.ts";

const router: Router = Router();

router.get("/summary", verifyToken, dashboardController.getSummary);

export default router;