import mongoose from "mongoose";

const complaintUpdateSchema = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    previousStatus: {
      type: String,
      enum: ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Closed"],
    },
    newStatus: {
      type: String,
      enum: ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Closed"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ComplaintUpdate", complaintUpdateSchema);
