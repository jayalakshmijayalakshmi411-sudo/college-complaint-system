import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a complaint title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a detailed description"],
    },
    category: {
      type: String,
      enum: ["Classroom", "Laboratory", "Hostel", "Wi-Fi", "Infrastructure", "Transportation", "Cleanliness", "Other"],
      required: [true, "Please select a category"],
    },
    aiCategory: {
      type: String,
      enum: ["Classroom", "Laboratory", "Hostel", "Wi-Fi", "Infrastructure", "Transportation", "Cleanliness", "Other"],
    },
    aiSummary: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    attachment: {
      public_id: String,
      url: String,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved", "Closed"],
      default: "Submitted",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: null,
    },
    assignedDepartment: {
      type: String,
      default: null,
    },
    resolutionDetails: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
