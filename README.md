# VidiVici Odoo — Human Resource Management System

> A full-stack HRMS built for the **Odoo Hackathon**, centralizing employee management, attendance tracking, payroll, and time-off through a React + Supabase web application.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [Authentication & Authorization](#-authentication--authorization)
  - [Employee Management](#-employee-management)
  - [Attendance Management](#-attendance-management)
  - [Salary Management](#-salary-management)
  - [Time-Off Management](#-time-off-management)
- [Role-Based Access](#role-based-access)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

**VidiVici Odoo** is a web-based Human Resource Management System (HRMS) that provides a centralized platform for end-to-end HR operations — from onboarding and attendance to payroll and leave management.

The system supports three access levels:

| Role | Capabilities |
|------|-------------|
| 👤 Employee | Self-service: attendance, payslips, leave requests |
| 🧑‍💼 HR Officer | Employee management, approvals, reporting |
| 🛡️ Administrator | Full system access, account creation, configuration |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React |
| Backend / Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (Email + Google OAuth) |
| Security | Row Level Security (RLS) |

---

## Features

### 🔐 Authentication & Authorization

- Email/password and Google OAuth login
- Admin/HR-controlled employee account creation
- Auto-generated employee Login IDs with Supabase Auth account mapping
- Role-based access control with Row Level Security (RLS) enforced at the database level

---

### 👥 Employee Management

- Create and manage employee profiles
- Department assignment and manager mapping
- Contact, personal, and banking information
- Role, skills, and certifications tracking

---

### ⏱️ Attendance Management

Employees can check in/out and view their own records. The system automatically computes:

```
Work Hours = Check-out time − Check-in time
Extra Hours = Work Hours − Standard shift duration
Payable Days = Days with valid attendance records
```

HR and Admins can view attendance records across all employees and generate reports.

---

### 💰 Salary Management

- Salary structure configuration per employee
- Automated payslip generation based on attendance and payable days
- Deduction and allowance support
- Payslip history accessible by employees

---

### 🏖️ Time-Off Management

- Employees submit leave requests with type and date range
- HR/Admin approval workflow
- Leave balance tracking per employee
- Leave types configurable by admins (e.g., casual, sick, earned)

---

## Role-Based Access

| Feature | Employee | HR Officer | Admin |
|---------|:--------:|:----------:|:-----:|
| View own profile | ✅ | ✅ | ✅ |
| Edit own profile | ✅ | ✅ | ✅ |
| View all employees | ❌ | ✅ | ✅ |
| Add / remove employees | ❌ | ✅ | ✅ |
| Approve leave requests | ❌ | ✅ | ✅ |
| Generate payslips | ❌ | ✅ | ✅ |
| System configuration | ❌ | ❌ | ✅ |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A Supabase project (with URL and anon key)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/vidivici-odoo.git
cd vidivici-odoo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start the dev server
npm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Project Structure

```
vidivici-odoo/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route-level views
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Supabase client and utilities
│   └── main.jsx
├── supabase/
│   └── migrations/       # SQL schema and RLS policies
├── .env.example
├── package.json
└── README.md
```

> **Note:** Adjust the structure above to match your actual repo layout.

---

## License

This project was developed as part of the Odoo Hackathon. See [LICENSE](LICENSE) for details.
