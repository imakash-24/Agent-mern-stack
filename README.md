# 🧑‍💻 Agent Management & Task Assignment System (MERN Stack)

A full-stack web application that allows admins to manage agents and assign tasks via CSV upload. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), Bootstrap 5 for responsive styling, and features a dashboard UI with authentication, CRUD operations, and mobile responsiveness.

---

## 🔧 Features

✅ Admin login system  
✅ Add, edit, and delete agents  
✅ Upload tasks via CSV and assign to agents  
✅ View assigned tasks in a responsive dashboard  
✅ Sidebar with mobile hamburger toggle  
✅ Styled with Bootstrap and custom CSS  
✅ Full responsive design (mobile/tablet/desktop)

---

## 🖼️ Screenshots

### 🖥️ Dashboard View
![Dashboard](./screenshots/dashboard.png)

---

## 🛠️ Tech Stack

| Tech        | Usage                          |
|-------------|---------------------------------|
| **Frontend**| React, React Router, Bootstrap 5 |
| **Backend** | Node.js, Express                |
| **Database**| MongoDB (Mongoose)              |
| **Others**  | Multer (CSV upload), dotenv     |

---

## 📁 Folder Structure

project-root/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── uploads/ # CSV files
│ ├── .env
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.css
│ └── public/
│
└── README.md

Setup Backend

cd backend
npm install
touch .env

Add the following in .env:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start backend server:

npm run dev
Setup Frontend
cd ../frontend
npm install
npm start

CSV Format for Upload
taskId,agentEmail
35DC1,agent1@example.com
35DC2,agent2@example.com
...
Admin Login Credentials
Email: admin@example.com
Password: your_admin_password

Future Improvements
Role-based access control

Search/filter agents and tasks

Export tasks to CSV

Dark mode toggle

Dashboard analytics

