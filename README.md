# 🎓 CampusResolve — College Complaint Management System

> **A full-stack, AI-powered digital platform for college students to report, track, and resolve campus-related grievances in real time with automated classification and executive administration triage.**

---

## 🌟 Key Features

### 👨‍🎓 1. Student Portal
- **Secure Registration & Authentication**: Student signup, JWT-authenticated login, and persistent session management.
- **AI-Assisted Complaint Submission**: File complaints for **Classroom, Laboratory, Hostel, Wi-Fi, Infrastructure, Transportation, Cleanliness, or Other** facilities. Includes photo upload and precise location tracking.
- **Real-Time Lifecycle Tracking**: Interactive 6-step progress stepper (**Submitted ➔ Under Review ➔ Assigned ➔ In Progress ➔ Resolved ➔ Closed**).
- **In-App Notifications**: Instant notifications whenever an administrator updates ticket status, assigns a department, or publishes resolution details.
- **Search & Multi-Filter**: Filter tickets by category, priority, or status, and search by keywords.

### 🛡️ 2. Administrator Operations Center
- **Executive KPI Dashboard**: High-level metrics tracking total tickets, active queues, category distribution, and critical alerts.
- **Complaint Triage & Department Dispatch**: Assign complaints directly to campus divisions (*IT & Network, Maintenance, Electrical & Plumbing, Hostel Affairs, Housekeeping, Transportation, Security*).
- **Priority Management**: Classify urgency (*Critical, High, Medium, Low*).
- **Official Resolution Workflow**: Publish resolution remarks, notify students automatically, and archive closed tickets.
- **Audit History**: Complete timeline log tracking every admin status transition and timestamp.

### 🤖 3. AI-Powered Features
- **Auto-Categorization**: Scans grievance titles and narratives to recommend the most accurate facility department.
- **Smart Summarization**: Synthesizes lengthy student descriptions into clear 2-sentence executive action items for rapid staff review.
- **Dual Engine**: Seamlessly connects to **Google Gemini AI API** when configured, or operates autonomously using an intelligent built-in keyword analyzer fallback.

---

## 🏗️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router DOM (v6), Axios, Lucide React Icons |
| **Backend** | Node.js, Express.js (ES Modules), JWT Authentication, Bcryptjs Password Hashing |
| **Database** | MongoDB & Mongoose ODM |
| **Media & Storage** | Multer & Cloudinary SDK |
| **AI Integration** | Google Generative AI (Gemini Pro) & Intelligent Heuristic Fallback Engine |

---

## 📁 Project Structure

```
project-folder/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI (Navbar, Badges, Cards, ProtectedRoute)
│   │   ├── context/            # AuthContext state management
│   │   ├── pages/              # Public & Student Pages (Home, Login, Register, Dashboard, Complaints, etc.)
│   │   │   └── admin/          # Admin Pages (AdminDashboard, AdminComplaints, AdminComplaintDetails)
│   │   ├── services/           # Axios API Client & interceptors
│   │   ├── App.jsx             # React Router routing configuration
│   │   ├── index.css           # Tailwind design tokens & utilities
│   │   └── main.jsx            # React root bootstrap
│   ├── index.html              # HTML5 template with typography
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # MongoDB & Cloudinary configuration
│   │   ├── controllers/        # Auth, Complaint, Admin, Notification & Dashboard controllers
│   │   ├── middleware/         # JWT Auth, Admin Role verification, Error handler
│   │   ├── models/             # Mongoose Models (User, Complaint, ComplaintUpdate, Notification)
│   │   ├── routes/             # RESTful API route definitions
│   │   ├── services/           # Business logic, AI engine, and notification dispatcher
│   │   ├── seed.js             # One-click database seeder with demo accounts & tickets
│   │   └── server.js           # Express app entrypoint
│   └── package.json
│
├── spec.md                     # Complete project specification
└── README.md                   # Local setup and usage guide
```

---

## 🚀 Step-by-Step Local Setup Guide

### 1. Prerequisites
Ensure you have the following installed on your computer:
1. **[Node.js](https://nodejs.org/)** (v18.x or higher) and `npm`
2. **[MongoDB](https://www.mongodb.com/try/download/community)** running locally (default: `mongodb://localhost:27017`) OR a free **[MongoDB Atlas](https://www.mongodb.com/atlas)** cloud database connection string.

---

### 2. Backend Setup (`server`)

1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Create your environment configuration file `.env`:
   ```bash
   # On Windows PowerShell
   Copy-Item .env.example .env

   # On Linux / macOS / Git Bash
   cp .env.example .env
   ```

3. Verify or edit `.env` with your settings:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/college-complaint-system

   # JWT Secret Key
   JWT_SECRET=college_complaint_super_secret_jwt_key_2026_secure
   JWT_EXPIRE=7d

   # Server Port
   PORT=5000
   NODE_ENV=development

   # (Optional) Google Gemini AI Key
   GOOGLE_API_KEY=your_gemini_api_key_here

   # (Optional) Cloudinary Credentials for image uploads
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret

   # Admin Default Credentials (used for initial seed)
   ADMIN_EMAIL=admin@college.edu
   ADMIN_PASSWORD=admin123456
   ```

4. Install server dependencies:
   ```bash
   npm install
   ```

5. Seed the database with sample complaints, notifications, and demo accounts:
   ```bash
   npm run seed
   ```

6. Start the backend development server:
   ```bash
   npm run dev
   # Or for standard start:
   npm start
   ```
   *The server will start on **`http://localhost:5000`** with a health check endpoint at `http://localhost:5000/api/health`.*

---

### 3. Frontend Setup (`client`)

1. Open a **new, separate terminal** and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Create the frontend environment configuration file `.env`:
   ```bash
   # On Windows PowerShell
   Copy-Item .env.example .env

   # On Linux / macOS / Git Bash
   cp .env.example .env
   ```
   *Make sure `VITE_API_BASE_URL=http://localhost:5000/api` is present in `.env`.*

3. Install frontend dependencies:
   ```bash
   npm install
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🔑 Pre-Configured Demo Credentials

For quick testing and evaluation, use the following pre-seeded accounts (or click the one-click demo buttons directly on the `/login` screen):

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Student** | `student@college.edu` | `password123` | Submit complaints, view personal tickets, track status stepper, in-app notifications |
| **Administrator** | `admin@college.edu` | `admin123456` | Overview dashboard, full complaint registry, prioritize tickets, assign departments, resolve complaints |

---

## 📡 REST API Documentation

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student account | Public |
| `POST` | `/api/auth/login` | Login user & return JWT token | Public |
| `GET` | `/api/auth/me` | Fetch currently authenticated user | Protected |

### 📝 Complaints (`/api/complaints`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/complaints` | Submit complaint (with optional file) | Student |
| `GET` | `/api/complaints` | Get authenticated student's complaints | Student |
| `GET` | `/api/complaints/:id` | Get specific complaint details | Owner / Admin |
| `PUT` | `/api/complaints/:id` | Update complaint details | Owner |
| `DELETE` | `/api/complaints/:id` | Delete complaint | Owner |
| `GET` | `/api/complaints/:id/updates` | Get complaint audit updates | Owner / Admin |

### 🛡️ Admin Operations (`/api/admin`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/admin/complaints` | Fetch all complaints with search & filters | Admin |
| `PUT` | `/api/admin/complaints/:id/status` | Update ticket status & log remark | Admin |
| `PUT` | `/api/admin/complaints/:id/priority` | Set priority (Low, Med, High, Critical) | Admin |
| `PUT` | `/api/admin/complaints/:id/assign` | Assign ticket to campus department | Admin |
| `PUT` | `/api/admin/complaints/:id/resolve` | Mark ticket resolved with solution details | Admin |
| `GET` | `/api/admin/dashboard/stats` | Retrieve admin KPI analytics | Admin |

### 📊 Dashboard Analytics (`/api/dashboard`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/dashboard/student` | Student metrics (Total, Active, Resolved) | Student |
| `GET` | `/api/dashboard/admin` | System-wide analytics & category volume | Admin |

### 🔔 Notifications (`/api/notifications`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/notifications` | Get user notifications list | Protected |
| `PUT` | `/api/notifications/:id/read` | Mark individual notification as read | Protected |
| `GET` | `/api/notifications/unread/count` | Get total unread count for navbar badge | Protected |

---

## 🛠️ Troubleshooting & FAQs

### 1. MongoDB Connection Failed (`MongooseServerSelectionError`)
- Ensure your MongoDB server is running:
  - Windows: Open Services (`services.msc`) and verify `MongoDB Server` is Started.
  - Or use a free cloud database URI from [MongoDB Atlas](https://www.mongodb.com/atlas) in your `server/.env`.

### 2. Port 5000 or 3000 already in use
- Change the `PORT=5000` in `server/.env` to another port (e.g., `PORT=5001`), and update `VITE_API_BASE_URL=http://localhost:5001/api` in `client/.env`.

### 3. AI Features without API Key
- If `GOOGLE_API_KEY` is not provided in `server/.env`, the system automatically activates its built-in rule and keyword analysis algorithm to categorize and summarize complaints without breaking.

### 4. PowerShell `npm.ps1 cannot be loaded` Script Error
- If Windows PowerShell blocks running npm scripts:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```
  Or run your commands using Command Prompt (`cmd.exe`) or Git Bash.

---

## 📄 License
ISC &copy; College Complaint Management System. Built for academic and campus facility administration.
