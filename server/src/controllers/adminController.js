import Complaint from "../models/Complaint.js";
import complaintService from "../services/complaintService.js";
import notificationService from "../services/notificationService.js";

export const adminController = {
  async getAllComplaints(req, res) {
    try {
      const { status, category, priority, search, sortBy = "-createdAt" } = req.query;
      let filter = {};

      if (status) filter.status = status;
      if (category) filter.category = category;
      if (priority) filter.priority = priority;

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      const complaints = await Complaint.find(filter)
        .populate("studentId", "name email")
        .sort(sortBy)
        .lean();

      res.status(200).json({
        success: true,
        complaints,
        total: complaints.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async updateComplaintStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, message } = req.body;
      const adminId = req.userId;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      const complaint = await complaintService.getComplaintById(id);
      const previousStatus = complaint.status;

      const updated = await complaintService.updateComplaint(id, { status });

      // Add complaint update
      await complaintService.addComplaintUpdate({
        complaintId: id,
        adminId,
        message: message || `Status changed from ${previousStatus} to ${status}`,
        previousStatus,
        newStatus: status,
      });

      // Notify student
      await notificationService.notifyStatusUpdated(complaint.studentId._id, id, status);

      res.status(200).json({
        success: true,
        message: "Complaint status updated successfully",
        complaint: updated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async updateComplaintPriority(req, res) {
    try {
      const { id } = req.params;
      const { priority } = req.body;

      if (!priority) {
        return res.status(400).json({
          success: false,
          message: "Priority is required",
        });
      }

      const updated = await complaintService.updateComplaint(id, { priority });

      res.status(200).json({
        success: true,
        message: "Complaint priority updated successfully",
        complaint: updated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async assignComplaint(req, res) {
    try {
      const { id } = req.params;
      const { assignedDepartment } = req.body;

      if (!assignedDepartment) {
        return res.status(400).json({
          success: false,
          message: "Department is required",
        });
      }

      const complaint = await complaintService.getComplaintById(id);
      const updated = await complaintService.updateComplaint(id, {
        assignedDepartment,
        status: "Assigned",
      });

      // Notify student
      await notificationService.notifyAssigned(complaint.studentId._id, id, assignedDepartment);

      res.status(200).json({
        success: true,
        message: "Complaint assigned successfully",
        complaint: updated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async resolveComplaint(req, res) {
    try {
      const { id } = req.params;
      const { resolutionDetails } = req.body;
      const adminId = req.userId;

      if (!resolutionDetails) {
        return res.status(400).json({
          success: false,
          message: "Resolution details are required",
        });
      }

      const complaint = await complaintService.getComplaintById(id);

      const updated = await complaintService.updateComplaint(id, {
        status: "Resolved",
        resolutionDetails,
      });

      // Add complaint update
      await complaintService.addComplaintUpdate({
        complaintId: id,
        adminId,
        message: `Complaint resolved. Details: ${resolutionDetails}`,
        previousStatus: complaint.status,
        newStatus: "Resolved",
      });

      // Notify student
      await notificationService.notifyResolved(complaint.studentId._id, id);

      res.status(200).json({
        success: true,
        message: "Complaint resolved successfully",
        complaint: updated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getDashboardStats(req, res) {
    try {
      const stats = {
        total: await Complaint.countDocuments(),
        submitted: await Complaint.countDocuments({ status: "Submitted" }),
        underReview: await Complaint.countDocuments({ status: "Under Review" }),
        inProgress: await Complaint.countDocuments({ status: "In Progress" }),
        resolved: await Complaint.countDocuments({ status: "Resolved" }),
        critical: await Complaint.countDocuments({ priority: "Critical" }),
      };

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default adminController;
