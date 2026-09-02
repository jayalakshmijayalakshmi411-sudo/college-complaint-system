import Complaint from "../models/Complaint.js";
import ComplaintUpdate from "../models/ComplaintUpdate.js";
import Notification from "../models/Notification.js";

export const complaintService = {
  async createComplaint(complaintData) {
    const complaint = new Complaint(complaintData);
    await complaint.save();
    await complaint.populate("studentId", "name email");
    return complaint;
  },

  async getComplaintsForStudent(studentId) {
    const complaints = await Complaint.find({ studentId })
      .populate("studentId", "name email")
      .sort({ createdAt: -1 });
    return complaints;
  },

  async getComplaintById(complaintId) {
    const complaint = await Complaint.findById(complaintId)
      .populate("studentId", "name email")
      .lean();
    if (!complaint) {
      throw new Error("Complaint not found");
    }
    return complaint;
  },

  async updateComplaint(complaintId, updateData) {
    const complaint = await Complaint.findByIdAndUpdate(complaintId, updateData, {
      new: true,
    }).populate("studentId", "name email");
    return complaint;
  },

  async deleteComplaint(complaintId) {
    await Complaint.findByIdAndDelete(complaintId);
  },

  async getComplaintUpdates(complaintId) {
    const updates = await ComplaintUpdate.find({ complaintId })
      .populate("adminId", "name email")
      .sort({ createdAt: -1 });
    return updates;
  },

  async addComplaintUpdate(updateData) {
    const update = new ComplaintUpdate(updateData);
    await update.save();
    await update.populate("adminId", "name email");
    return update;
  },
};

export default complaintService;
