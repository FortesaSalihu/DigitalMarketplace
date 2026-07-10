# Digital Marketplace

A modern full-stack Digital Marketplace built with **Next.js 16**, **React**, **MongoDB**, **NextAuth**, **Material UI**, and **Cloudinary**. The application provides a complete marketplace experience where users can browse digital products, while administrators manage categories, products, and platform content through a secure dashboard.

---

# Project Overview

The Digital Marketplace is a full-stack web application developed using the **Next.js App Router** architecture. The application follows a modular structure that separates presentation, business logic, authentication, and data access into different layers, making the project easier to maintain, extend, and test.

The system provides:

- User Authentication
- Role-Based Authorization
- Product Management
- Category & Subcategory Management
- Image Uploads
- User Dashboard
- Admin Dashboard
- Responsive UI
- MongoDB Database Integration

---

# System Architecture

The project follows a layered architecture.

```
                    +-----------------------+
                    |      Client Browser   |
                    +-----------+-----------+
                                |
                                v
                    +-----------------------+
                    |     Next.js App       |
                    |     App Router        |
                    +-----------+-----------+
                                |
          +---------------------+---------------------+
          |                                           |
          v                                           v
+-----------------------+                 +-----------------------+
|    React Components   |                 |     API Routes        |
|   Material UI Pages   |                 |  Server Actions       |
+-----------+-----------+                 +-----------+-----------+
            |                                         |
            +-------------------+---------------------+
                                |
                                v
                    +-----------------------+
                    |    Business Logic     |
                    +-----------+-----------+
                                |
              +-----------------+-----------------+
              |                                   |
              v                                   v
      +-------------------+             +-------------------+
      |     MongoDB       |             |    Cloudinary     |
      |   Mongoose ODM    |             |  Image Storage    |
      +-------------------+             +-------------------+
```

---

# Architecture Layers

## Presentation Layer

Responsible for the user interface.

- React Components
- Material UI
- Responsive Layout
- Client-side Rendering

---

## Application Layer

Contains the application logic.

- Next.js App Router
- API Routes
- Server Actions
- Form Validation

---

## Authentication Layer

Handles user authentication and authorization.

- NextAuth
- Session Management
- Role-Based Access Control
- Protected Routes

---

## Data Layer

Responsible for storing application data.

- MongoDB
- Mongoose Models
- Database CRUD Operations

---

## External Services

Third-party services integrated into the project.

- Cloudinary (Image Uploads)

---

# Features

## Authentication

- User Registration
- User Login
- Secure Password Hashing (bcrypt)
- NextAuth Authentication
- Session Management
- Logout
- Change Password

---

## User Features

- Create Account
- Login Securely
- Browse Products
- View Product Details
- Edit Profile
- Change Password
- User Dashboard

---

## Admin Features

The administrator has complete control over the marketplace.

### Dashboard

- Dashboard Overview
- Navigation Sidebar
- Platform Statistics

### Category Management

- Create Categories
- Edit Categories
- Delete Categories
- View Category List

### Subcategory Management

- Create Subcategories
- Edit Subcategories
- Delete Subcategories
- View Subcategory List

### Product Management

- Create Products
- Edit Products
- Delete Products
- Upload Images
- Product Status Management

---

# Database Design

The application uses MongoDB with Mongoose ODM.

Main collections:

- Users
- Categories
- Subcategories
- Products

Relationships:

- One Category → Many Subcategories
- One Subcategory → Many Products
- One User → Authentication Information

---

# Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Full Stack Framework |
| React 19 | Frontend |
| MongoDB | NoSQL Database |
| Mongoose | MongoDB ODM |
| NextAuth | Authentication |
| Material UI | UI Components |
| Redux Toolkit | Global State Management |
| React Redux | State Management |
| Cloudinary | Image Storage |
| Axios | HTTP Requests |
| bcrypt | Password Hashing |
| Slugify | SEO Friendly URLs |
| React Toastify | Notifications |

---

# Project Structure

```
my-app
│
├── app
│   ├── dashboard
│   │   ├── admin
│   │   ├── author
│   │   └── user
│   ├── api
│   ├── login
│   ├── register
│   └── page.js
│
├── actions
│
├── components
│
├── context
│
├── libs
│
├── models
│
├── public
│
├── styles
│
└── middleware.js
```

---

# Folder Responsibilities

| Folder | Responsibility |
|---------|----------------|
| app | Application pages, layouts, API routes, dashboards |
| components | Reusable React components |
| actions | Server-side business logic |
| models | Mongoose database schemas |
| libs | Database connection and helper utilities |
| context | React Context Providers |
| public | Static assets |
| styles | Global styling |
| middleware.js | Route protection and middleware |

---

# Installation

Clone the repository

```bash
git clone https://github.com/FortesaSalihu/DigitalMarketplace.git
```

Go to the project

```bash
cd DigitalMarketplace/my-app
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Application Workflow

```
User
 │
 ▼
Register / Login
 │
 ▼
NextAuth Authentication
 │
 ▼
Session Created
 │
 ▼
Protected Dashboard
 │
 ▼
API Routes
 │
 ▼
MongoDB Database
 │
 ▼
Cloudinary (Image Uploads)
```

---

# Security

The application includes several security mechanisms.

- Password Hashing using bcrypt
- Protected Routes
- Role-Based Authorization
- Environment Variables
- Session Management
- Secure Authentication with NextAuth
- Server-side Validation

---

# Design Principles

The project follows modern software engineering practices.

- Component-Based Architecture
- Separation of Concerns
- Modular Folder Structure
- Reusable Components
- RESTful API Design
- Layered Architecture
- Scalable Project Structure

---

# Future Improvements

Potential enhancements include:

- Shopping Cart
- Wishlist
- Stripe Payment Integration
- Product Reviews
- Product Ratings
- Advanced Search
- Product Filtering
- Order History
- Email Verification
- Password Recovery
- Notifications
- Multi-language Support
- Dark Mode

---


# Learning Outcomes

This project demonstrates practical knowledge of:

- Full Stack Web Development
- Next.js App Router
- MongoDB Database Design
- REST API Development
- Authentication & Authorization
- Cloudinary Integration
- Responsive UI Design
- State Management
- Secure Web Application Development
- Software Architecture
- Modern JavaScript (ES6+)

---

# Author

**Fortesa Salihu**

Computer Science & Engineering

UBT

---

# License

This project was developed for educational purposes as part of a university project.
