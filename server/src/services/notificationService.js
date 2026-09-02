import Notification from "../models/Notification.js";

export const notificationService = {
  async createNotification(notificationData) {
    const notification = new Notification(notificationData);
    await notification.save();
    await notification.populate("complaintId");
    return notification;
  },

  async getNotificationsForUser(userId) {
    const notifications = await Notification.find({ userId })
      .populate("complaintId")
      .sort({ createdAt: -1 });
    return notifications;
  },

  async markAsRead(notificationId) {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    ).populate("complaintId");
    return notification;
  },

  async getUnreadCount(userId) {
    const count = await Notification.countDocuments({ userId, isRead: false });
    return count;
  },

  async notifyComplaintSubmitted(userId, complaintId) {
    return this.createNotification({
      userId,
      complaintId,
      title: "Complaint Submitted",
      message: "Your complaint has been successfully submitted.",
      type: "submitted",
    });
  },

  async notifyStatusUpdated(userId, complaintId, newStatus) {
    return this.createNotification({
      userId,
      complaintId,
      title: "Complaint Status Updated",
      message: `Your complaint status has been updated to: ${newStatus}`,
      type: "status_updated",
    });
  },

  async notifyAssigned(userId, complaintId, department) {
    return this.createNotification({
      userId,
      complaintId,
      title: "Complaint Assigned",
      message: `Your complaint has been assigned to ${department} department.`,
      type: "assigned",
    });
  },

  async notifyResolved(userId, complaintId) {
    return this.createNotification({
      userId,
      complaintId,
      title: "Complaint Resolved",
      message: "Your complaint has been resolved. Check for details.",
      type: "resolved",
    });
  },
};

export default notificationService;
