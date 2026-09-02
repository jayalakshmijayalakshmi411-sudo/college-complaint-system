import complaintService from "../services/complaintService.js";
import aiService from "../services/aiService.js";
import notificationService from "../services/notificationService.js";
import cloudinary from "../config/cloudinary.js";

export const complaintController = {
  async createComplaint(req, res) {
    try {
      const { title, description, category, location } = req.body;
      const studentId = req.userId;

      // Validate required fields
      if (!title || !description || !category || !location) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      let attachment = null;

      // Handle file upload if provided
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "complaints",
            resource_type: "auto",
          });
          attachment = {
            public_id: result.public_id,
            url: result.secure_url,
          };
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
        }
      }

      // Create complaint
      const complaint = await complaintService.createComplaint({
        title,
        description,
        category,
        location,
        attachment,
        studentId,
      });

      // AI Categorization
      let aiCategory = null;
      try {
        aiCategory = await aiService.categorizeComplaint(title, description);
        if (aiCategory) {
          complaint.aiCategory = aiCategory;
        }
      } catch (aiError) {
        console.error("AI categorization error:", aiError.message);
      }

      // AI Summarization
      let aiSummary = null;
      try {
        aiSummary = await aiService.summarizeComplaint(description);
        if (aiSummary) {
          complaint.aiSummary = aiSummary;
        }
      } catch (aiError) {
        console.error("AI summarization error:", aiError.message);
      }

      // Save AI results
      await complaint.save();

      // Create notification
      await notificationService.notifyComplaintSubmitted(studentId, complaint._id);

      res.status(201).json({
        success: true,
        message: "Complaint submitted successfully",
        complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getComplaints(req, res) {
    try {
      const studentId = req.userId;
      const complaints = await complaintService.getComplaintsForStudent(studentId);

      res.status(200).json({
        success: true,
        complaints,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getComplaintById(req, res) {
    try {
      const { id } = req.params;
      const complaint = await complaintService.getComplaintById(id);

      // Check authorization
      if (complaint.studentId._id.toString() !== req.userId && req.userRole !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Not authorized to view this complaint",
        });
      }

      res.status(200).json({
        success: true,
        complaint,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async updateComplaint(req, res) {
    try {
      const { id } = req.params;
      const complaint = await complaintService.getComplaintById(id);

      // Check authorization
      if (complaint.studentId._id.toString() !== req.userId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to update this complaint",
        });
      }

      const updated = await complaintService.updateComplaint(id, req.body);

      res.status(200).json({
        success: true,
        message: "Complaint updated successfully",
        complaint: updated,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async deleteComplaint(req, res) {
    try {
      const { id } = req.params;
      const complaint = await complaintService.getComplaintById(id);

      // Check authorization
      if (complaint.studentId._id.toString() !== req.userId) {
        return res.status(403).json({
          success: false,
          message: "Not authorized to delete this complaint",
        });
      }

      await complaintService.deleteComplaint(id);

      res.status(200).json({
        success: true,
        message: "Complaint deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getComplaintUpdates(req, res) {
    try {
      const { id } = req.params;
      const updates = await complaintService.getComplaintUpdates(id);

      res.status(200).json({
        success: true,
        updates,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async addComplaintUpdate(req, res) {
    try {
      const { id } = req.params;
      const { message, previousStatus, newStatus } = req.body;
      const adminId = req.userId;

      const update = await complaintService.addComplaintUpdate({
        complaintId: id,
        adminId,
        message,
        previousStatus,
        newStatus,
      });

      res.status(201).json({
        success: true,
        message: "Update added successfully",
        update,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default complaintController;
