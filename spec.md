1. Project Overview

Build a full-stack web application called College Complaint Management System.

The system allows students to submit complaints about college-related issues and track their complaints until they are resolved.

Students can report problems related to:

Classroom
Laboratory
Hostel
Wi-Fi
Infrastructure
Transportation
Cleanliness
Other college facilities

Administrators can review complaints, assign priorities, update complaint statuses, and provide resolution details.

The application will also include AI-powered features to automatically categorize and summarize complaints.

2. Project Objective

The main objective of the system is to create a centralized digital platform where students can easily submit and track complaints.

The system should:

Reduce manual complaint handling.
Improve communication between students and administrators.
Make complaint tracking transparent.
Help administrators manage complaints efficiently.
Use AI to assist in complaint management.
3. User Roles

The system has two main user roles:

3.1 Student

Students can:

Register and login.
Submit complaints.
Upload complaint attachments.
View their complaints.
Track complaint status.
View complaint updates.
Receive notifications.
3.2 Administrator

Administrators can:

Login securely.
View all complaints.
Search and filter complaints.
View complaint details.
Set complaint priority.
Assign complaints to departments.
Update complaint status.
Add updates and resolution details.
4. Technology Stack
Frontend
React.js
Vite
Tailwind CSS
React Router DOM
Axios
Lucide React
Backend
Node.js
Express.js
JWT
bcryptjs
Database
MongoDB
Mongoose
File Upload
Cloudinary
AI

An AI API will be used for:

Complaint categorization.
Complaint summarization.
5. Authentication and Authorization

The application must provide:

Student registration.
Student login.
Admin login.
JWT authentication.
Password hashing using bcrypt.
Logout functionality.
Protected routes.
Role-based access control.

Students should only be able to view and manage their own complaints.

Administrators should be able to access all complaint management features.

6. Complaint Management
6.1 Submit Complaint

Students should be able to submit a complaint with:

Complaint title
Category
Detailed description
Location
Image or file attachment

The complaint should be stored in the database.

6.2 Complaint Categories

The system should support the following categories:

Classroom
Laboratory
Hostel
Wi-Fi
Infrastructure
Transportation
Cleanliness
Other
6.3 Complaint Status

Each complaint should have one of the following statuses:

Submitted
↓
Under Review
↓
Assigned
↓
In Progress
↓
Resolved
↓
Closed
6.4 Complaint Priority

Administrators can assign the following priority levels:

Low
Medium
High
Critical
6.5 Complaint Tracking

Students should be able to view:

Complaint title
Category
Status
Priority
Assigned department
Admin updates
Resolution details
Submission date
7. BONUS FEATURE 1 — AI COMPLAINT CATEGORIZATION 🤖

When a student submits a complaint, the AI should analyze the complaint title and description.

The AI should automatically suggest the most appropriate complaint category.

Example

Student Complaint:

The internet connection is not working properly in the library.

AI Suggested Category:

Wi-Fi

The administrator can review and change the suggested category if required.

8. BONUS FEATURE 2 — AI COMPLAINT SUMMARIZATION 📝

Students may write long complaint descriptions.

The AI should generate a short and clear summary.

Example

Original Complaint:

The computers in the computer laboratory have been restarting frequently for the last few days, making it difficult for students to complete their laboratory work.

AI Summary:

Multiple computers in the laboratory are malfunctioning and affecting student laboratory work.

The AI-generated summary should be visible to the administrator.

9. BONUS FEATURE 3 — IN-APP NOTIFICATIONS 🔔

The system should notify students when important events occur.

Notifications should be created when:

A complaint is successfully submitted.
The complaint status is updated.
The complaint is assigned.
The complaint is resolved.

Each notification should contain:

Notification title
Notification message
Related complaint
Date and time
Read/unread status
10. Frontend Pages
Public Pages
Home Page

Route:

/

Features:

Project introduction
System features
How the system works
Login button
Register button
Login Page

Route:

/login

Features:

Email input
Password input
Login button
Error messages
Registration Page

Route:

/register

Features:

Name
Email
Password
Confirm password
Registration button
11. Student Pages
Student Dashboard

Route:

/dashboard

Display:

Total complaints
Active complaints
Resolved complaints
Recent complaints
Submit Complaint

Route:

/complaints/new

Fields:

Title
Category
Description
Location
Attachment

After submission:

Complaint is stored.
AI categorizes the complaint.
AI creates a summary.
A notification is created.
My Complaints

Route:

/complaints

Features:

View all submitted complaints.
Search complaints.
Filter by status.
Filter by category.
Complaint Details

Route:

/complaints/:id

Display:

Title
Description
Category
AI category suggestion
AI summary
Status
Priority
Assigned department
Admin updates
Resolution details
Notifications Page

Route:

/notifications

Features:

View all notifications.
Mark notification as read.
View related complaint.
12. Admin Pages
Admin Dashboard

Route:

/admin/dashboard

Display:

Total complaints
Submitted complaints
Under review complaints
In-progress complaints
Resolved complaints
Critical complaints
Manage Complaints

Route:

/admin/complaints

Features:

View all complaints.
Search complaints.
Filter complaints.
Sort complaints.
Complaint Management Page

Route:

/admin/complaints/:id

The administrator should be able to:

View complaint details.
View AI category suggestion.
View AI summary.
Set category.
Set priority.
Assign department.
Update complaint status.
Add comments.
Add resolution details.
13. Backend Architecture

The backend should follow a structured architecture.

Routes

Responsible for:

API routing.
Connecting routes to controllers.
Authentication middleware.
Controllers

Responsible for:

Receiving requests.
Calling services.
Returning responses.
Services

Responsible for:

Authentication.
Complaint management.
AI categorization.
AI summarization.
Notification management.
Models

Responsible for:

Database schemas.
Middleware

Responsible for:

Authentication.
Role verification.
Error handling.
Request validation.
14. Database Design
Users Collection
User
├── name
├── email
├── password
├── role
└── createdAt

Roles:

student
admin
Complaints Collection
Complaint
├── title
├── description
├── category
├── aiCategory
├── aiSummary
├── location
├── attachment
├── studentId
├── status
├── priority
├── assignedDepartment
├── resolutionDetails
├── createdAt
└── updatedAt
Complaint Updates Collection
ComplaintUpdate
├── complaintId
├── adminId
├── message
├── previousStatus
├── newStatus
└── createdAt
Notifications Collection
Notification
├── userId
├── complaintId
├── title
├── message
├── type
├── isRead
└── createdAt
15. API Endpoints
Authentication APIs
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Complaint APIs
POST   /api/complaints
GET    /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
Complaint Update APIs
GET  /api/complaints/:id/updates
POST /api/complaints/:id/updates
Admin APIs
GET /api/admin/complaints

PUT /api/admin/complaints/:id/status

PUT /api/admin/complaints/:id/priority

PUT /api/admin/complaints/:id/assign

PUT /api/admin/complaints/:id/resolve
Notification APIs
GET /api/notifications

PUT /api/notifications/:id/read
Dashboard APIs
GET /api/dashboard/student

GET /api/dashboard/admin
16. Project Folder Structure
Frontend
client/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── ComplaintCard/
│   │   ├── ComplaintForm/
│   │   ├── StatusBadge/
│   │   ├── NotificationBell/
│   │   └── ProtectedRoute/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Complaints.jsx
│   │   ├── ComplaintDetails.jsx
│   │   ├── NewComplaint.jsx
│   │   ├── Notifications.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminComplaints.jsx
│   │       └── AdminComplaintDetails.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
Backend
server/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   ├── notificationController.js
│   │   └── adminController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── complaintService.js
│   │   ├── aiService.js
│   │   └── notificationService.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   ├── ComplaintUpdate.js
│   │   └── Notification.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── validationMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   └── server.js
│
└── package.json
17. Development Phases
Phase 1: Project Setup and Authentication

Build:

Frontend setup.
Backend setup.
MongoDB connection.
Student registration.
Login.
JWT authentication.
Protected routes.
Phase 2: Student Complaint System

Build:

Complaint submission form.
Complaint database storage.
Complaint history.
Complaint details page.
File/image upload.
Phase 3: Admin Complaint Management

Build:

Admin dashboard.
View all complaints.
Search and filtering.
Priority management.
Department assignment.
Status updates.
Phase 4: AI Features

Build:

AI complaint categorization.
AI complaint summarization.
Display AI results to administrators.
Phase 5: Notifications

Build:

Notification database.
Notification creation.
Notification page.
Read/unread functionality.
Phase 6: Testing and Deployment

Test:

Authentication.
Complaint submission.
AI features.
Notifications.
Admin functionality.

Deploy:

Frontend.
Backend.
Database.
18. UI/UX Requirements

The application should:

Be fully responsive.
Work on mobile and desktop.
Have a modern and clean design.
Use clear navigation.
Show complaint status clearly.
Show priority levels clearly.
Display loading indicators.
Display meaningful error messages.
19. Security Requirements

The application must:

Hash passwords.
Use JWT authentication.
Protect API routes.
Use role-based access control.
Validate user input.
Use environment variables for sensitive information.
Never expose API keys.
Never upload .env files to GitHub.
20. Final Expected Workflow
Student Workflow
Register
   ↓
Login
   ↓
Submit Complaint
   ↓
AI Categorizes Complaint
   ↓
AI Generates Summary
   ↓
Complaint Submitted
   ↓
Receive Notifications
   ↓
Track Complaint Status
   ↓
View Resolution
Administrator Workflow
Login
   ↓
View Complaints
   ↓
Review AI Category and Summary
   ↓
Set Priority
   ↓
Assign Department
   ↓
Update Status
   ↓
Add Resolution Details
   ↓
Resolve Complaint
   ↓
Student Receives Notification
FINAL PROJECT FEATURES
Core Features

✅ Student Registration and Login
✅ Admin Login
✅ JWT Authentication
✅ Complaint Submission
✅ File/Image Upload
✅ Complaint Tracking
✅ Status Management
✅ Priority Management
✅ Department Assignment
✅ Complaint Updates
✅ Resolution Details
