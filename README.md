# Digital Marketplace

A modern full-stack Digital Marketplace built with **Next.js 16**, **React 19**, **MongoDB**, **NextAuth**, **Material UI**, **Redux Toolkit**, and **Cloudinary**.

The application provides a complete digital marketplace where users can browse products, manage their profiles, and access dashboards based on their roles, while administrators manage categories, subcategories, products, and uploaded files through a secure administration panel.

---

# Project Overview

Digital Marketplace is a full-stack web application built using the **Next.js App Router**.

The project combines both frontend and backend within a single Next.js application by using **API Routes** for server-side logic and **MongoDB** as the primary database.

The application follows a **Modular Layered Architecture**, where responsibilities are separated into logical layers. This makes the project easier to maintain, extend, and understand while keeping the code organized.

The application includes:

- User Authentication
- Role-Based Authorization (User, Author, Admin — Reviewer role reserved for a future dashboard, see note below)
- Product Management
- Category Management
- Subcategory Management
- Image Uploads
- User Dashboard
- Author Dashboard
- Admin Dashboard
- Responsive User Interface
- MongoDB Integration
- Cloudinary Image Storage

---

# Software Architecture

The project follows a **Modular Layered Architecture** built on the **Next.js App Router**.

Instead of separating each layer into different projects, the application separates responsibilities into logical layers inside a single Next.js application. Each layer has its own responsibility, improving maintainability, scalability, and code organization.

```
                    +------------------------------------------------+
                    |                    USER                        |
                    +------------------------------------------------+
                                      |
                                      ▼
+--------------------------------------------------------------------+
|                     PRESENTATION LAYER                             |
|--------------------------------------------------------------------|
| • Next.js App Router                                               |
| • React Components                                                 |
| • Material UI                                                      |
| • Redux Toolkit                                                    |
| • User Interface                                                   |
+--------------------------------------------------------------------+
                                      |
                                      ▼
+--------------------------------------------------------------------+
|           AUTHENTICATION & AUTHORIZATION LAYER                     |
|--------------------------------------------------------------------|
| • NextAuth                                                         |
| • JWT Session Management                                           |
| • proxy.js                                                         |
| • Role-Based Access Control                                        |
+--------------------------------------------------------------------+
                                      |
                                      ▼
+--------------------------------------------------------------------+
|                    APPLICATION LAYER                               |
|--------------------------------------------------------------------|
| • API Routes                                                       |
| • Business Logic                                                   |
| • Request Validation                                               |
| • CRUD Operations                                                  |
+--------------------------------------------------------------------+
                                      |
                                      ▼
+--------------------------------------------------------------------+
|                        DATA LAYER                                  |
|--------------------------------------------------------------------|
| • MongoDB                                                          |
| • Mongoose Models                                                  |
| • User                                                             |
| • Category                                                         |
| • SubCategory                                                      |
| • Item                                                             |
| • UploadedFile                                                     |
| • ItemHistory                                                      |
+--------------------------------------------------------------------+
                                      |
                                      ▼
                     +--------------------------+
                     |      CLOUDINARY          |
                     |--------------------------|
                     | Image Upload & Storage   |
                     +--------------------------+
                                      |
                                      ▼
                            +--------------------+
                            |     RESPONSE       |
                            +--------------------+
```

---

# Architecture Layers

## 1. Presentation Layer

The Presentation Layer is responsible for everything the user sees and interacts with.

It is implemented using:

- Next.js App Router
- React Components (all Client Components, `"use client"`)
- Material UI
- Redux Toolkit
- Reusable Components
- Dashboards

Responsibilities:

- Display application data
- Handle user interactions
- Collect user input
- Send requests to the Application Layer

This layer does **not** communicate directly with the database.

---

## 2. Authentication & Authorization Layer

Authentication is implemented using **NextAuth**, while route protection is handled through **`proxy.js`**.

This layer verifies the user's identity before allowing access to protected pages and API routes.

Responsibilities:

- User Authentication
- JWT Session Management
- Role-Based Authorization
- Protected Routes

The authorization layer currently recognizes four roles at the routing level — `user`, `author`, `admin`, and `reviewer` — though the **reviewer role is reserved in `proxy.js` and the data model (`ItemHistory.reviewer_id`) for a future dashboard that hasn't been built yet**. Product review, for now, happens inside the Admin dashboard (see [Future Improvements](#future-improvements)).

---

## 3. Application Layer

The Application Layer contains the business logic of the application.

It is implemented using **Next.js API Routes**.

Responsibilities:

- Process incoming requests
- Validate data
- Execute business logic
- Perform CRUD operations
- Communicate with MongoDB
- Return responses to the client

This layer acts as the bridge between the user interface and the database.

---

## 4. Data Layer

The Data Layer is responsible for storing and retrieving application data.

Technologies used:

- MongoDB
- Mongoose (`utils/dbConnect.js`)

Database models (`models/`) include:

- User
- Category
- SubCategory
- Item
- UploadedFile
- ItemHistory

These models are used by the API Routes to perform CRUD (Create, Read, Update, Delete) operations.

---

## 5. External Services

The project integrates Cloudinary (`lib/cloudinary.js`) for image management.

Instead of storing image files inside MongoDB, uploaded images are stored in Cloudinary while only their URLs are saved in the database. This approach improves performance, reduces database storage requirements, and makes image delivery faster.

---

# Application Workflow

1. A user interacts with the interface.
2. The request is sent to `proxy.js`, which checks the JWT and role if the route is protected.
3. The request reaches a Next.js API Route.
4. The request is validated.
5. Business logic is executed.
6. Data is stored or retrieved from MongoDB.
7. Images are uploaded to Cloudinary when necessary.
8. The response is returned to the user interface, and Redux Toolkit updates the store.

---

# Features

## Authentication

- User Registration
- User Login
- Secure Password Hashing (bcrypt)
- NextAuth Authentication
- JWT Session Management
- Logout
- Change Password
- Protected Routes

---

## User Features

- Register Account
- Login Securely
- Browse Products
- View Product Details
- Manage Profile
- Change Password
- User Dashboard

---

## Author Features

- Author Dashboard
- Upload Files
- Manage Products
- Manage Profile
- Change Password

---

## Administrator Features

The administrator has full control over the platform.

### Dashboard

- Dashboard Overview
- Platform Management

### Category Management

- Create Categories
- Edit Categories
- Delete Categories
- View Categories

### Subcategory Management

- Create Subcategories
- Edit Subcategories
- Delete Subcategories
- View Subcategories

### Product Management

- Create Products
- Edit Products
- Delete Products
- Upload Product Images
- Manage Product Status
- Review submitted items (approve / soft-reject / hard-reject) — this currently lives inside the Admin dashboard rather than a separate Reviewer dashboard

---

# Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Full Stack Framework |
| React 19 | Frontend Library |
| MongoDB | NoSQL Database |
| Mongoose | MongoDB ODM |
| NextAuth | Authentication |
| Material UI | User Interface |
| Redux Toolkit | Global State Management |
| React Redux | Redux Bindings |
| Axios | HTTP Requests |
| Cloudinary | Image Storage |
| bcrypt | Password Hashing |
| Slugify | SEO Friendly URLs |
| React Toastify | Notifications |

---

# Project Structure

```text
my-app
│
├── app
│   ├── api
│   ├── dashboard
│   │   ├── admin
│   │   ├── author
│   │   └── user
│   ├── login
│   ├── register
│   └── page.js
│
├── components
├── models
├── utils
├── lib
├── slice
├── public
├── config.js
└── proxy.js
```

---

# Folder Responsibilities

| Folder / File | Responsibility |
|---------------|---------------|
| app | Application pages, layouts, dashboards and API Routes |
| components | Reusable React components |
| models | Mongoose database models |
| utils | Database connection and authentication configuration |
| lib | Cloudinary configuration |
| slice | Redux Toolkit state management |
| public | Static assets |
| config.js | Environment variables configuration |
| proxy.js | Route protection and role-based authorization |

---

# Installation

Clone the repository

```bash
git clone https://github.com/FortesaSalihu/DigitalMarketplace.git
```

Navigate to the project

```bash
cd DigitalMarketplace/my-app
```

Install dependencies

```bash
npm install
```

Create a **.env.local** file

```env
DB_URI=

API=http://localhost:3000/api

NEXT_PUBLIC_API=http://localhost:3000/api

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

> **Note:** `DB_URI`, `API`, and `NEXT_PUBLIC_API` are read directly in the code (`config.js`, Redux slices, and the file-upload component), so all three are required. `NEXT_PUBLIC_API` needs the `NEXT_PUBLIC_` prefix because it's read from a Client Component in the browser.

Run the development server

```bash
npm run dev
```

Open the application

```
http://localhost:3000
```

---

# Security

The project includes several security mechanisms:

- Password Hashing using bcrypt
- Secure Authentication with NextAuth
- JWT Session Management
- Role-Based Authorization
- Route Protection using `proxy.js`
- Protected API Routes
- Environment Variables

---

# Design Principles

The application follows modern software engineering principles:

- Modular Layered Architecture
- Separation of Concerns
- Component-Based Development
- Reusable Components
- RESTful API Design
- Scalable Folder Organization
- Secure Authentication
- Clean Code Structure

---

# Future Improvements

- Build a dedicated **Reviewer Dashboard** (`/dashboard/reviewer`) for the role already reserved in `proxy.js` and `ItemHistory`, separating the review workflow out of the Admin dashboard
- Shopping Cart
- Wishlist
- Product Reviews
- Product Ratings
- Advanced Search
- Product Filtering
- Email Verification
- Password Recovery
- Multi-language Support
- Dark Mode

---

# Learning Outcomes

This project demonstrates practical knowledge of:

- Full-Stack Web Development
- Next.js App Router
- React Component Development
- REST API Development
- MongoDB Database Design
- Authentication & Authorization
- Cloudinary Integration
- State Management using Redux Toolkit
- Secure Web Application Development
- Software Architecture

---

# Author

**Fortesa Salihu**

Computer Science & Engineering

UBT

---

# License

This project was developed for educational purposes as part of a university project.
