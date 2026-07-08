# Digital Marketplace

A modern full-stack Digital Marketplace built with **Next.js 16**, **React**, **MongoDB**, **NextAuth**, **Material UI**, and **Cloudinary**. The application provides a complete marketplace experience where users can browse digital products, while administrators manage categories, products, and platform content through a secure dashboard.

---

# Project Overview

The Digital Marketplace is a web application developed using the latest Next.js App Router architecture.

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

The project follows modern full-stack development practices and separates frontend, backend APIs, authentication, and database logic.

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
- View Dashboard
- Edit Profile
- Change Password
- Browse Products
- View Product Details

---

## Admin Features

The administrator has full control over the platform.

### Dashboard

- Admin Dashboard
- Navigation Sidebar
- Statistics Overview

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
- Upload Product Images
- Product Status Management

---

## Image Upload

Images are uploaded using **Cloudinary**.

Features:

- Secure Upload
- Cloud Storage
- Fast Delivery
- Optimized Images

---

## Database

MongoDB stores all application data.

Collections include:

- Users
- Categories
- Subcategories
- Products

---

# Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Full Stack Framework |
| React 19 | Frontend |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| NextAuth | Authentication |
| Material UI | UI Components |
| Redux Toolkit | State Management |
| React Redux | Global State |
| Cloudinary | Image Storage |
| Axios | HTTP Requests |
| bcrypt | Password Encryption |
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
│   │
│   ├── login
│   ├── register
│   └── api
│
├── components
│
├── context
│
├── models
│
├── actions
│
├── libs
│
├── public
│
└── styles
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/DigitalMarketplace.git
```

Go into the project folder

```bash
cd DigitalMarketplace/my-app
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file and configure the following environment variables:

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Run the application

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Application Workflow

1. User registers.
2. Password is encrypted.
3. User logs in through NextAuth.
4. Session is created.
5. User accesses protected pages.
6. Administrator manages marketplace data.
7. Product images are uploaded to Cloudinary.
8. MongoDB stores all application data.

---

# Security

The project includes several security features:

- Password Hashing
- Protected Routes
- Role-Based Authorization
- Environment Variables
- Secure Authentication
- Session Management

---

# Future Improvements

Potential future enhancements include:

- Shopping Cart
- Wishlist
- Stripe Payment Integration
- Product Reviews
- Product Ratings
- Search & Filtering
- Order History
- Email Verification
- Password Recovery
- Notifications
- Multi-language Support
- Dark Mode

---

# Screenshots

You can include screenshots here.

Example:

```
/screenshots/home.png
/screenshots/dashboard.png
/screenshots/admin.png
```

---

# Learning Outcomes

This project demonstrates knowledge of:

- Full Stack Web Development
- Next.js App Router
- MongoDB Database Design
- REST API Development
- Authentication & Authorization
- Responsive UI Design
- Cloud Image Management
- State Management
- Modern JavaScript (ES6+)
- React Components
- Secure Web Application Development

---

# Author

Fortesa Salihu

Computer Science & Engineering

UBT

---

# License

This project was developed for educational purposes as part of a university project.