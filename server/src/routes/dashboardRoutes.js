import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Student dashboard
router.get("/student", authMiddleware, dashboardController.getStudentDashboard);

// Admin dashboard
router.get("/admin", authMiddleware, adminMiddleware, dashboardController.getAdminDashboard);

export default router;
