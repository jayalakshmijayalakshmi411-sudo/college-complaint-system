import notificationService from "../services/notificationService.js";

export const notificationController = {
  async getNotifications(req, res) {
    try {
      const userId = req.userId;
      const notifications = await notificationService.getNotificationsForUser(userId);

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async markAsRead(req, res) {
    try {
      const { id } = req.params;
      const notification = await notificationService.markAsRead(id);

      res.status(200).json({
        success: true,
        message: "Notification marked as read",
        notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getUnreadCount(req, res) {
    try {
      const userId = req.userId;
      const count = await notificationService.getUnreadCount(userId);

      res.status(200).json({
        success: true,
        unreadCount: count,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default notificationController;
