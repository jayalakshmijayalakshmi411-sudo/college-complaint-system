import express from "express";
import complaintController from "../controllers/complaintController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Protected routes - require authentication
router.post("/", authMiddleware, upload.single("attachment"), complaintController.createComplaint);
router.get("/", authMiddleware, complaintController.getComplaints);
router.get("/:id", authMiddleware, complaintController.getComplaintById);
router.put("/:id", authMiddleware, complaintController.updateComplaint);
router.delete("/:id", authMiddleware, complaintController.deleteComplaint);
router.get("/:id/updates", authMiddleware, complaintController.getComplaintUpdates);
router.post("/:id/updates", authMiddleware, complaintController.addComplaintUpdate);

export default router;
