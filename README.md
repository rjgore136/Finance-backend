# Finance Backend API

A robust Node.js/Express REST API for managing finance operations including user authentication, transactions, and dashboard analytics. Built with MongoDB, JWT auth, Zod validation, and role-based access control.

## ✨ Features

- **User Management**: Register, login, profile, CRUD users (admin/user roles).
- **Authentication**: JWT tokens, bcrypt hashing, cookie support.
- **Transactions**: Full CRUD (create/read/update/delete) with pagination.
- **Dashboard**: Summary stats, recent transactions.
- **Security**: Rate limiting, input validation, error handling, auth middleware.
- **Database**: MongoDB with Mongoose; auto-admin user creation.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (ES modules)
- **Database**: MongoDB
- **Auth**: JWT, bcrypt
- **Validation**: Zod
- **Other**: cookie-parser, express-rate-limit, dotenv

## 📋 Prerequisites

- Node.js (v20+)
- MongoDB instance (local or Atlas) with connection URI
- Git

## 🚀 Quick Start

1. **Clone the repo**

   ```
   git clone <your-repo-url>
   cd Finance-Backend
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example` if available, or add below vars):

   ```
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/finance_db  # or your Atlas URI
   JWT_SECRET=your-super-secret-jwt-key
   ADMIN_NAME=Admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   ```

4. **Run the server**

   ```
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

   Server runs at `http://localhost:3000`. First run creates admin user.

## 📖 API Endpoints

All endpoints prefixed with `/api/`. Auth required for protected routes (JWT in cookies).

### Auth (`/api/auth`)

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | `/login` | User login  |

### Users (`/api/users`)

| Method | Endpoint | Description               | Auth  |
| ------ | -------- | ------------------------- | ----- |
| POST   | `/`      | Create user               | -     |
| GET    | `/`      | Get all users (paginated) | Admin |
| GET    | `/me`    | Get current user          | User  |
| PUT    | `/:id`   | Update user               | Admin |
| DELETE | `/:id`   | Delete user               | Admin |

### Transactions (`/api/transactions`)

| Method | Endpoint | Description                  | Auth |
| ------ | -------- | ---------------------------- | ---- |
| POST   | `/`      | Create transaction           | User |
| GET    | `/`      | Get transactions (paginated) | User |
| GET    | `/:id`   | Get transaction by ID        | User |
| PUT    | `/:id`   | Update transaction           | User |
| DELETE | `/:id`   | Delete transaction           | User |

### Dashboard (`/api/dashboard`)

| Method | Endpoint   | Description             | Auth |
| ------ | ---------- | ----------------------- | ---- |
| GET    | `/summary` | Dashboard summary stats | User |
| GET    | `/recent`  | Recent transactions     | User |

## 📁 Project Structure

```
Finance-Backend/
├── package.json
├── .env
├── src/
│   ├── app.js              # Main app, routes
│   ├── server.js           # Entrypoint
│   ├── config/             # DB connection, JWT, errors
│   ├── middlewares/        # Auth, validation, rate-limit, errors
│   ├── modules/
│   │   ├── auth/           # Login/register
│   │   ├── user/           # User CRUD
│   │   ├── transaction/    # Transaction CRUD
│   │   └── dashboard/      # Analytics
│   └── utils/
└── node_modules/
```

## 🔧 Environment Variables

| Var              | Description               | Example                              |
| ---------------- | ------------------------- | ------------------------------------ |
| `PORT`           | Server port               | 3000                                 |
| `MONGO_URL`      | MongoDB connection string | mongodb://localhost:27017/finance_db |
| `JWT_SECRET`     | JWT signing secret        | supersecretkey                       |
| `ADMIN_NAME`     | Initial admin name        | Admin                                |
| `ADMIN_EMAIL`    | Initial admin email       | admin@example.com                    |
| `ADMIN_PASSWORD` | Initial admin password    | admin123                             |
