import Complaint from "../models/Complaint.js";

export const dashboardController = {
  async getStudentDashboard(req, res) {
    try {
      const studentId = req.userId;

      const total = await Complaint.countDocuments({ studentId });
      const active = await Complaint.countDocuments({
        studentId,
        status: { $nin: ["Resolved", "Closed"] },
      });
      const resolved = await Complaint.countDocuments({
        studentId,
        status: { $in: ["Resolved", "Closed"] },
      });
      const submitted = await Complaint.countDocuments({
        studentId,
        status: "Submitted",
      });

      const recentComplaints = await Complaint.find({ studentId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

      res.status(200).json({
        success: true,
        stats: {
          total,
          active,
          resolved,
          submitted,
        },
        recentComplaints,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getAdminDashboard(req, res) {
    try {
      const total = await Complaint.countDocuments();
      const submitted = await Complaint.countDocuments({ status: "Submitted" });
      const underReview = await Complaint.countDocuments({ status: "Under Review" });
      const inProgress = await Complaint.countDocuments({ status: "In Progress" });
      const assigned = await Complaint.countDocuments({ status: "Assigned" });
      const resolved = await Complaint.countDocuments({ status: { $in: ["Resolved", "Closed"] } });
      const critical = await Complaint.countDocuments({ priority: "Critical" });

      // Category breakdown
      const categoryBreakdown = await Complaint.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]);

      const recentComplaints = await Complaint.find()
        .populate("studentId", "name email")
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();

      res.status(200).json({
        success: true,
        stats: {
          total,
          submitted,
          underReview,
          inProgress,
          assigned,
          resolved,
          critical,
        },
        categoryBreakdown,
        recentComplaints,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default dashboardController;
