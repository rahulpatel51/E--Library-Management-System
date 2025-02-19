# 📚 E-Library Management System

Welcome to the **E-Library Management System**! This project is designed to provide a comprehensive and user-friendly solution for managing books, user accounts, and borrowing history in an online library environment. The system is built with a **modern frontend** using **HTML, CSS, and JavaScript**, combined with a **Node.js** backend, **Express** server, and **MongoDB** for database management, along with **authentication** for secure access.

## 🌟 Features
- **User Authentication** – Secure login and registration system with JWT-based authentication
- **Book Management** – Add, update, and delete books in the library
- **Borrowing System** – Users can borrow and return books
- **Admin Dashboard** – Admins can manage users and books
- **Responsive Design** – Optimized for both desktop and mobile views
- **Search Functionality** – Search and filter books by title, author, and genre

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Additional Libraries**: 
  - **bcrypt** (for password hashing)
  - **cors** (for handling cross-origin requests)
  - **dotenv** (for managing environment variables)

## 📂 Folder Structure

E-Library/ ├── backend/ # Backend code (Node.js, Express, MongoDB) │ ├── controllers/ # Business logic for API routes │ ├── models/ # Mongoose models (Book, User) │ ├── routes/ # API routes for authentication, books, etc. │ ├── middleware/ # Middleware (Authentication checks) │ ├── server.js # Entry point for the backend server ├── frontend/ # Frontend code (HTML, CSS, JavaScript) │ ├── index.html # Main homepage │ ├── login.html # User login page │ ├── register.html # User registration page │ ├── dashboard.html # User dashboard (books, borrow, etc.) │ ├── css/ # Styles for the frontend │ ├── js/ # JavaScript logic for frontend functionality └── README.md # Project documentation



---

## 🔧 Installation & Setup  

### **Step 1: Clone the Repository**  
```bash
git clone https://github.com/yourusername/E-Library-Management-System.git
cd E-Library-Management-System

cd backend
npm install  # Install backend dependencies

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

npm start

