import express from "express";
import notificationController from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All notification routes require authentication
router.use(authMiddleware);

router.get("/", notificationController.getNotifications);
router.put("/:id/read", notificationController.markAsRead);
router.get("/unread/count", notificationController.getUnreadCount);

export default router;
