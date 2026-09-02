import express from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

router.get("/complaints", adminController.getAllComplaints);
router.put("/complaints/:id/status", adminController.updateComplaintStatus);
router.put("/complaints/:id/priority", adminController.updateComplaintPriority);
router.put("/complaints/:id/assign", adminController.assignComplaint);
router.put("/complaints/:id/resolve", adminController.resolveComplaint);
router.get("/dashboard/stats", adminController.getDashboardStats);

export default router;
