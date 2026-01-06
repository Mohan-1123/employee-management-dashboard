# Employee Management Dashboard

## Project Overview

This project is a React-based Employee Management Dashboard that allows users to manage employee records efficiently.  
It includes authentication, employee CRUD operations, profile image upload with preview, search & filter functionality, and print support.

---

## Tech Stack Used

- React.js (JavaScript)
- CSS (Flexbox only)
- Local Storage for data persistence
- React Icons
- HTML5 FileReader API

---

## Authentication

- Mock login functionality
- User must log in to access the dashboard
- Unauthorized users cannot access dashboard routes

---

## Dashboard Features

### Dashboard Summary
- Total Employees count
- Active Employees count
- Inactive Employees count

---

## Employee Management

### Employee List

Each employee record displays:
- Employee ID
- Profile Image
- Full Name
- Gender
- Date of Birth
- State
- Active / Inactive status toggle
- Actions:
  - Edit
  - Delete (with confirmation modal)
  - Print

---

### Employee Form (Add / Edit)

- Single reusable form for Add & Edit
- Fields:
  - Employee ID (unique & required)
  - Full Name
  - Gender
  - Date of Birth
  - State (dropdown)
  - Profile Image upload (mandatory)
  - Active / Inactive status

#### Form Features
- Field-level validation
- Employee ID uniqueness validation
- Profile image preview before save
- Image type validation

---

## Search & Filters

- Search employees by Name
- Filter by:
  - Gender
  - Active / Inactive status
- Filters work together (combined filtering)

---



## Data Handling

- Uses Local Storage for persistence
- Mock data used for initial load
- All CRUD operations sync with Local Storage


##  How to Run the Project Locally

###  Prerequisites
- Node.js (v16 or above)
- npm

---

###  Install Dependencies
Open the project folder in terminal and run:

npm install

---

###  Run the Project
Start the development server:

npm run dev

Open your browser and visit:

http://localhost:5173

---

##  Login Instructions

This project uses mock authentication.

### Login Rules
- Email: Enter any random Gmail address  
  Example: test@gmail.com

- Password: Must be at least 6 characters  
  Example: 123456

---

###  Login Steps
1. Enter a Gmail address
2. Enter a password with minimum 6 characters
3. Click the **Login** button
4. You will be redirected to the Dashboard

---

###  Example Credentials
Email: demo@gmail.com  
Password: 123456

---

##  Notes
- Authentication is handled using localStorage
- No backend API is used
- Employee data is stored locally
