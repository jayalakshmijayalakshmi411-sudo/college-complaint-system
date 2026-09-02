import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Complaint from "./models/Complaint.js";
import ComplaintUpdate from "./models/ComplaintUpdate.js";
import Notification from "./models/Notification.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/college-complaint-system";

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB for seeding...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully.");

    // Clear existing collections
    await User.deleteMany({});
    await Complaint.deleteMany({});
    await ComplaintUpdate.deleteMany({});
    await Notification.deleteMany({});
    console.log("Cleared existing data.");

    // Create Admin User
    const admin = new User({
      name: "System Administrator",
      email: process.env.ADMIN_EMAIL || "admin@college.edu",
      password: process.env.ADMIN_PASSWORD || "admin123456",
      role: "admin",
    });
    await admin.save();
    console.log(`Created admin user: ${admin.email}`);

    // Create Demo Student
    const student = new User({
      name: "Alex Johnson",
      email: "student@college.edu",
      password: "password123",
      role: "student",
    });
    await student.save();
    console.log(`Created demo student: ${student.email}`);

    // Create Sample Complaints
    const complaint1 = new Complaint({
      title: "Wi-Fi signal completely dead on 2nd floor library",
      description:
        "The internet connection has been completely unreachable in the main reading area on the 2nd floor of the library since yesterday morning. Students are unable to access research papers.",
      category: "Wi-Fi",
      aiCategory: "Wi-Fi",
      aiSummary:
        "Library 2nd floor Wi-Fi is down, preventing students from accessing online academic resources.",
      location: "Central Library, 2nd Floor Reading Hall",
      studentId: student._id,
      status: "In Progress",
      priority: "High",
      assignedDepartment: "IT Support",
    });
    await complaint1.save();

    const complaint2 = new Complaint({
      title: "Multiple PCs in Computer Lab 3 crashing during simulations",
      description:
        "Computers 12 through 18 in Computer Lab 3 turn off spontaneously when running MATLAB simulations. This has caused multiple students to lose unsaved practical work.",
      category: "Laboratory",
      aiCategory: "Laboratory",
      aiSummary:
        "Terminals 12-18 in Lab 3 crash during heavy software execution, leading to data loss.",
      location: "Technology Block B, Lab 302",
      studentId: student._id,
      status: "Under Review",
      priority: "Medium",
    });
    await complaint2.save();

    const complaint3 = new Complaint({
      title: "Water cooler leaking near Classroom 204",
      description:
        "Water cooler on the 2nd floor corridor has a constant leak creating slippery floor hazards near room 204.",
      category: "Cleanliness",
      aiCategory: "Cleanliness",
      aiSummary: "Leaking water cooler near room 204 is creating slippery and unsafe conditions.",
      location: "Academic Block 1, 2nd Floor Corridor",
      studentId: student._id,
      status: "Resolved",
      priority: "Medium",
      assignedDepartment: "Housekeeping & Maintenance",
      resolutionDetails:
        "Maintenance replaced the faulty gasket and drainage pipe. Floor dried and sanitized.",
    });
    await complaint3.save();

    const complaint4 = new Complaint({
      title: "Hostel Block C hot water geyser not working",
      description:
        "The water heating system on the 3rd floor of Hostel Block C has not been functioning for 3 days.",
      category: "Hostel",
      aiCategory: "Hostel",
      aiSummary: "3rd floor geyser in Hostel C is inoperable for the past 3 days.",
      location: "Hostel Block C, Floor 3 Restroom",
      studentId: student._id,
      status: "Submitted",
      priority: "High",
    });
    await complaint4.save();

    // Create Complaint Update
    const update1 = new ComplaintUpdate({
      complaintId: complaint1._id,
      adminId: admin._id,
      message: "Network technician dispatched to inspect router access point AP-04.",
      previousStatus: "Under Review",
      newStatus: "In Progress",
    });
    await update1.save();

    const update2 = new ComplaintUpdate({
      complaintId: complaint3._id,
      adminId: admin._id,
      message: "Plumbing team replaced the seal and valve. Issue resolved.",
      previousStatus: "In Progress",
      newStatus: "Resolved",
    });
    await update2.save();

    // Create Notifications for Student
    await Notification.create([
      {
        userId: student._id,
        complaintId: complaint1._id,
        title: "Complaint Status Updated",
        message: "Your complaint status has been updated to: In Progress",
        type: "status_updated",
        isRead: false,
      },
      {
        userId: student._id,
        complaintId: complaint3._id,
        title: "Complaint Resolved",
        message: "Your complaint has been resolved. Check for details.",
        type: "resolved",
        isRead: true,
      },
      {
        userId: student._id,
        complaintId: complaint4._id,
        title: "Complaint Submitted",
        message: "Your complaint has been successfully submitted.",
        type: "submitted",
        isRead: true,
      },
    ]);

    console.log("Seeded sample complaints and notifications successfully!");
    console.log("\n=========================================");
    console.log("DEMO ACCOUNTS READY:");
    console.log("Student: student@college.edu / password123");
    console.log("Admin:   admin@college.edu   / admin123456");
    console.log("=========================================\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
