# MERN Learning Management System (LMS)

A full-stack Learning Management System built with the MERN stack. This application features user and admin roles, OTP-based registration, course and lecture management, progress tracking, and payment integration.

---
## 📺 Preview

[![Preview Video](https://img.youtube.com/vi/-rkOo5zhuqM/0.jpg)](https://youtu.be/-rkOo5zhuqM)

> 🎥 Click the thumbnail above to watch the preview video on YouTube.
## 🚀 Features

* ✅ OTP Email Verification on Registration
* ✅ Role-Based Login: User / Admin / SuperAdmin
* ✅ Admin: Create & Delete Courses, Add & Remove Lectures
* ✅ Razorpay Payment Integration
* ✅ Track User Progress per Lecture
* ✅ JWT Authentication
* ✅ Nodemailer for Password Reset
* ✅ Modern React Frontend with Vite
* ✅ Toast Notifications

---

## 🛠️ Tech Stack

| Layer    | Tech                      |
| -------- | ------------------------- |
| Frontend | React, Vite, React Router |
| Backend  | Node.js, Express.js       |
| Database | MongoDB, Mongoose         |
| Auth     | JWT, Bcrypt               |
| Email    | Nodemailer                |
| Payment  | Razorpay                  |
| Uploads  | Multer                    |


## 🧾 .env Configuration (Backend)

Create a `.env` file in the `server` directory:

```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
DB=
PORT=
Activation_Secret=
Jwt_Sec=
Gmail=
Password=
Forgot_Secret=
frontendurl=http://localhost:5173
```

> ⚠️ Never commit this file. Use environment variables securely.

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-lms.git
cd mern-lms
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
npm run dev
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
npm run dev
```

---

## 🔐 User Roles

| Role       | Permissions                            |
| ---------- | -------------------------------------- |
| User       | Enroll, Watch Lectures, Track Progress |
| Admin      | Manage Courses and Lectures            |
| SuperAdmin | Reserved for future enhancements       |

---

## 📄 Mongoose Models

### User

* name, email, password
* role ("user"/"admin")
* mainrole
* subscription: [course refs]
* resetPasswordExpire

### Course

* title, description, image, price, duration, category, createdBy

### Lecture

* title, description, video (URL), course ref

### Progress

* user ref, course ref, completedLectures [lecture refs]

### Payment

* razorpay_order_id, payment_id, signature

---

## 📌 Future Enhancements

* Admin Analytics Dashboard
* SuperAdmin Control Panel
* Certificates on Course Completion
* Discussion Forum

---

## 🤝 Contribution

Pull requests and suggestions are welcome. Fork the repo and open a PR!

---

## 📝 License

MIT License. © 2025 Md Afjal Ansari
