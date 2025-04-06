# 📚 Reflexa – AI-Powered Teacher Assistant

**Reflexa** is an AI-driven educational platform built to enhance teaching and learning experiences. It provides a seamless environment where teachers can upload assignments and receive AI-generated evaluations, while students can access assignments, study material, and performance feedback.

---

## 🚀 Purpose

The project aims to support **UN Sustainable Development Goal 4 (Quality Education)** by automating assignment grading using AI and making learning more personalized, efficient, and inclusive for students.

---

## 🧠 Core Use Case

- **Teachers** upload assignments.
- **Students** submit their answers (images or text).
- The AI assistant compares the submission with a **sample solution** using **Gemini API** and provides:
  - A **grade**
  - **Personalized feedback**
- Submitted assignment images are stored using **Cloudinary**.

---

## 🛠️ Technologies Used

- **Frontend:** React.js (with Vite, Tailwind CSS, Chart.js)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Gemini API (Google)
- **Image Storage:** Cloudinary
- **Deployment:** Vercel (frontend), Render (backend)

---

## 📁 Features

- Role-based dashboards (Teacher/Student)
- Assignment upload & submission
- Automated grading via Gemini API
- Cloud-based image storage (Cloudinary)
- Top-scoring student leaderboard
- Student analytics and time tracker
- Access to PDFs, eBooks, and YouTube videos

---

## ☁️ Cloudinary Setup (For Image Uploads)

### 🔧 Step-by-step Guide:

1. Go to [https://cloudinary.com](https://cloudinary.com) and create a free account.
2. After logging in, visit your **Dashboard** to find the following keys:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. In your `.env` file, add the following:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. In the backend, ensure Cloudinary is configured like:

```js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

### ✅ Use Case:

Cloudinary is used to **store and retrieve** student assignment image submissions efficiently via URLs, making them AI-readable and reducing backend storage load.

---

## 🤖 Gemini API Setup (For AI-Powered Grading)

### 🔧 Step-by-step Guide:

1. Go to [Google AI Studio](https://makersuite.google.com/) and generate your **Gemini API Key**.
2. Add this key to your `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

3. Make API requests using the Gemini SDK or `fetch`/`axios`:

```js
const headers = {
  Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
  "Content-Type": "application/json",
};

const body = {
  contents: [
    {
      parts: [
        { text: "Evaluate this student's answer compared to this sample solution..." },
      ],
    },
  ],
};

const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
  method: "POST",
  headers,
  body: JSON.stringify(body),
});
```

### ✅ Use Case:

Gemini API is used to **compare** student answers with model solutions and return a **grade with personalized feedback**, enabling real-time AI-powered assessment.

---

## 🔐 Required API Keys

| Key                  | Usage                            |
|----------------------|----------------------------------|
| `CLOUDINARY_CLOUD_NAME` | Image uploads (Cloudinary)       |
| `CLOUDINARY_API_KEY`     | Image uploads (Cloudinary)       |
| `CLOUDINARY_API_SECRET`  | Image uploads (Cloudinary)       |
| `GEMINI_API_KEY`         | AI grading & feedback (Gemini)   |

---

## 📷 Updated Dashboard Snapshot

> The updated Student Dashboard includes buttons for Assignments, Tests, E-Books, PDF Notes, YouTube Videos, and a Top Scoring Students table with filter by batch functionality.

![Dashboard](./assets/dashboard-snapshot.png) <!-- Make sure to add the actual image in the repo or use a correct Cloudinary/Vercel-hosted link -->

---