# 📚 Reflexa – AI-Powered Teacher Assistant

🌐 **Live Preview:** [https://reflexa.onrender.com](https://reflexa.onrender.com)

**Reflexa** is an AI-driven educational platform designed to transform traditional learning by automating assignment evaluation and enhancing student-teacher interaction. It creates a dynamic space where educators can efficiently assess student performance, and learners can track their progress and access learning resources with ease.

---

## 🚀 Purpose

The goal of Reflexa is to contribute to **UN Sustainable Development Goal 4: Quality Education** by leveraging artificial intelligence to make education more **inclusive, personalized, efficient, and scalable**. It simplifies evaluation processes and provides **instant feedback**, reducing the manual workload for educators.

---

## 🧠 Core Use Case

- **Teachers** upload assignments with a model/sample solution.
- **Students** submit answers (text or images).
- AI assistant compares the student’s submission to the sample solution using **Gemini API**.
- Automatically provides:
  - A **score**
  - **Constructive, personalized feedback**
- Assignment images are uploaded and stored securely using **Cloudinary**.

---

## 🛠️ Technologies Used

- **Frontend:** React.js (Vite) + Tailwind CSS + Chart.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **AI Grading:** Gemini API (Google)
- **Cloud Storage:** Cloudinary
- **Deployment:** Render (Backend) + Vercel (Frontend)

---

## 📁 Key Features

- Role-based authentication (Teacher / Student)
- Dashboard for assignment management
- Student assignment submission (image or text)
- Real-time AI grading and personalized feedback
- Cloudinary-based image storage
- Leaderboard of top-performing students
- Access to eBooks, PDFs, and YouTube learning materials
- Analytics with progress and time tracker

---

## ☁️ Cloudinary Setup (Image Uploads)

### 🔧 Step-by-step:

1. Sign up at [https://cloudinary.com](https://cloudinary.com).
2. From your dashboard, copy the following:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Add them to your backend `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
