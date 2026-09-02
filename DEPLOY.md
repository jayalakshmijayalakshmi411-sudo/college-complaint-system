# 🚀 Complete Deployment Guide: College Complaint Management System

This guide walks you through deploying your full-stack application online for free in **under 5 minutes** using **Render** (for the Backend API) and **Vercel** (for the React Frontend).

---

## 📋 Overview of Deployment Architecture

```
┌──────────────────────────────────────┐
│        Frontend (React + Vite)       │  --> Hosted on VERCEL (Free Global CDN)
│    https://your-app.vercel.app       │
└──────────────────┬───────────────────┘
                   │  API Requests (HTTPS)
                   ▼
┌──────────────────────────────────────┐
│        Backend (Node.js + Express)   │  --> Hosted on RENDER (Free Web Service)
│  https://your-backend.onrender.com   │
└──────────────────┬───────────────────┘
                   │  Database Connection
                   ▼
┌──────────────────────────────────────┐
│       Cloud Database (MongoDB Atlas) │  --> Verified & Active
└──────────────────────────────────────┘
```

---

## 🌐 PART 1: Deploy Backend API on Render

### Step 1: Sign up & Connect GitHub
1. Go to **[https://render.com/](https://render.com/)** and click **Get Started for Free** (choose **Sign in with GitHub**).
2. On your Render dashboard, click the blue **New +** button in the top right and select **Web Service**.

---

### Step 2: Select your GitHub Repository
1. Look for **`college-complaint-system`** in your repository list and click **Connect**.
   *(If not visible, click "Configure GitHub App" to grant Render access to your repository).*

---

### Step 3: Configure Service Settings
Fill in the deployment form with the following exact settings:

| Field | Value | Notes |
|---|---|---|
| **Name** | `college-complaint-backend` | *(Or any name you prefer)* |
| **Language** | `Node` | |
| **Branch** | `main` | |
| **Region** | Select closest to you (e.g. *Singapore* or *Frankfurt*) | |
| **Root Directory** | `server` | ⚠️ **Important:** Type `server` |
| **Build Command** | `npm install` | |
| **Start Command** | `npm start` | |
| **Instance Type** | `Free` ($0/month) | |

---

### Step 4: Add Environment Variables
Scroll down to the **Environment Variables** section, click **Add Environment Variable** for each row:

| Key | Value |
|---|---|
| `MONGODB_URI` | `mongodb+srv://jayalakshmijayalakshmi411_db_user:aC2y0VIMkgWSpUM4@cluster0.ahthayb.mongodb.net/college-complaint-system?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | `college_complaint_super_secret_jwt_key_2026_secure` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `ADMIN_EMAIL` | `admin@college.edu` |
| `ADMIN_PASSWORD` | `admin123456` |

---

### Step 5: Deploy
1. Click **Deploy Web Service** at the bottom.
2. Wait 1–2 minutes while Render installs dependencies and starts the server.
3. When it says **`Live`**, copy your backend URL from the top of the page:
   > 📋 Example: `https://college-complaint-backend.onrender.com`

---

## ⚡ PART 2: Deploy Frontend on Vercel

### Step 1: Sign up & Import Project
1. Go to **[https://vercel.com/](https://vercel.com/)** and sign up / log in with **GitHub**.
2. Click **Add New...** ➔ **Project**.
3. Locate **`college-complaint-system`** and click **Import**.

---

### Step 2: Configure Project Settings
In the configuration screen:

1. **Framework Preset:** Select **Vite**.
2. **Root Directory:** Click the **Edit** button next to Root Directory, select the **`client`** folder, and click **Continue**.

---

### Step 3: Set Frontend Environment Variable
Expand the **Environment Variables** section and add:

| Key | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://your-render-backend-url.onrender.com/api` |

> ⚠️ **Important:** Make sure to append `/api` to your Render URL!
> *Example:* If your Render URL is `https://college-complaint-backend.onrender.com`, then the value must be `https://college-complaint-backend.onrender.com/api`.

---

### Step 4: Click Deploy!
1. Click the **Deploy** button.
2. Vercel will build and deploy your React app in ~30 seconds.
3. Click on the preview screenshot or the domain link to visit your live site! 🎉

---

## 🔑 Default Login Credentials (Pre-seeded in Atlas)

### 👨‍🎓 Student Account:
- **Email:** `student@college.edu`
- **Password:** `password123`

### 🛡️ Administrator Account:
- **Email:** `admin@college.edu`
- **Password:** `admin123456`

*(You can also use the one-click demo login buttons directly on the `/login` screen).*

---

## 🛠️ Post-Deployment Verification Checklist

- [ ] Open the Vercel URL in your browser or mobile phone.
- [ ] Log in as a Student (`student@college.edu` / `password123`).
- [ ] Submit a test complaint with a title, category, and description.
- [ ] Log out and log in as an Admin (`admin@college.edu` / `admin123456`).
- [ ] View the submitted complaint, assign priority, assign a department, and mark it resolved.
- [ ] Log back in as a Student to verify the in-app notification and status progression.
