# 🌍 Tour Booking Website

This is a full-stack **MERN** (MongoDB, Express, React, Node.js) travel and tour booking website. It allows users to browse tour packages, book tours, and manage their bookings. Guides can add and update their own packages.

---

## 🔧 Tech Stack

### 🚀 Frontend
- **React** – UI development
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first CSS framework
- **DaisyUI** – Pre-built Tailwind components
- **Firebase Authentication** – User login (Email/Password and Google)
- **React Context API** – Authentication context
- **Axios** – API requests with credentials
- **SweetAlert2** – Alert modals
- **react-fast-marquee** – For banner messages or announcements
- **React Icons** – Icon integration (edit, warning, etc.)

### 🛠 Backend
- **Node.js** – Server-side runtime
- **Express.js** – RESTful API development
- **MongoDB Atlas** – Cloud-hosted NoSQL database
- **jsonwebtoken (JWT)** – Secure token authentication
- **cookie-parser** – Parse and handle httpOnly cookies
- **cors** – Enable cross-origin requests
- **dotenv** – Secure environment variables

---

## 📂 Features

### 🧑‍💼 User
- Browse all tour packages
- View tour details
- Book tours (secured with Firebase JWT & httpOnly cookies)
- See personal bookings (My Bookings)

### 🧭 Tour Guide
- Add new tour packages
- View “My Packages”
- Edit and delete own packages
- Booking count is shown per package

---

## 🔒 Authentication

- Auth via Firebase
- JWT issued from server on login and stored as httpOnly cookie
- Protected routes using custom `PrivateRoute` component

---

## 📦 Packages Used

| Package | Description |
|--------|-------------|
| `react-router-dom` | For routing |
| `firebase` | Authentication |
| `axios` | HTTP requests |
| `sweetalert2` | User-friendly modals |
| `react-icons` | Icons |
| `react-fast-marquee` | Scrolling text |
| `tailwindcss` | Styling |
| `daisyui` | Tailwind UI components |
| `jsonwebtoken` | JWT token handling |
| `express` | Server framework |
| `cors` | Cross-origin support |
| `cookie-parser` | Handling cookies |
| `mongodb` | Database |




