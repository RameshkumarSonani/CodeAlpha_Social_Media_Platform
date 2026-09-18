# CodeAlpha Social Media Platform

A full-stack social media platform built as part of the **CodeAlpha Full Stack Developer Internship**.

The application allows users to register, log in securely, create posts, comment on posts, like/unlike posts, follow other users, and view dynamic user profiles with followers and following information.

## 🚀 Features

* 🔐 User Registration & Login
* 🔑 JWT Authentication
* 🔄 Automatic JWT Token Refresh
* 📝 Create Text Posts
* 💬 Add Comments
* 🗑️ Delete Own Comments
* ❤️ Like & Unlike Posts
* 👤 User Profiles
* 👥 Follow & Unfollow Users
* 📋 Followers & Following Lists
* 🔗 Dynamic User Profiles
* 🛡️ Protected Routes
* 📱 Responsive User Interface
* ⚠️ Invalid Profile Handling
* 🗄️ Database Integration

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT

### Database

* SQLite

### Development Tools

* Git
* GitHub
* VS Code

## 📂 Project Structure

```text
CodeAlpha_Social_Media_Platform/
│
├── Backend/
│   └── SocialMedia/
│       ├── accounts/
│       ├── posts/
│       ├── comments/
│       ├── SocialMedia/
│       ├── manage.py
│       └── db.sqlite3
│
├── Frontend/
│   └── Social_Media_Platform/
│       ├── src/
│       │   ├── Components/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## 🔐 Authentication

The application uses **JWT (JSON Web Token)** authentication through Django REST Framework and Simple JWT.

Authentication includes:

* Access tokens
* Refresh tokens
* Automatic access-token refresh
* Protected API endpoints
* Protected frontend routes
* Secure logout handling

## 📌 Main Functionality

### User Authentication

Users can create an account and log in using their credentials.

### Posts

Authenticated users can create text-based posts and view posts from other users.

### Comments

Users can comment on posts and delete their own comments.

### Likes

Users can like and unlike posts. The application also displays the total number of likes and maintains the user's like state.

### Follow System

Users can follow and unfollow other users.

The application provides:

* Followers count
* Following count
* Followers list
* Following list
* Dynamic profiles

Users cannot follow themselves.

### User Profiles

Each user has a dynamic profile containing:

* Username
* Email
* Bio
* Followers count
* Following count
* Followers list
* Following list

The Follow button is automatically hidden when viewing the logged-in user's own profile.

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RameshkumarSonani/CodeAlpha_Social_Media_Platform.git
```

```bash
cd CodeAlpha_Social_Media_Platform
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend/SocialMedia
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers pillow
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

Backend will run at:

```text
http://127.0.0.1:8000/
```

### 3. Frontend Setup

Open a new terminal and navigate to:

```bash
cd Frontend/Social_Media_Platform
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Frontend will normally run at:

```text
http://localhost:5173/
```

## 🔗 API Overview

| Endpoint                            | Method   | Description                 |
| ----------------------------------- | -------- | --------------------------- |
| `/api/accounts/register/`           | POST     | Register a new user         |
| `/api/token/`                       | POST     | Login and obtain JWT tokens |
| `/api/token/refresh/`               | POST     | Refresh access token        |
| `/api/accounts/profile/`            | GET      | View own profile            |
| `/api/accounts/profile/<id>/`       | GET      | View another user's profile |
| `/api/posts/`                       | GET/POST | View or create posts        |
| `/api/comments/`                    | GET/POST | View or create comments     |
| `/api/comments/<id>/`               | DELETE   | Delete own comment          |
| `/api/posts/<id>/like/`             | POST     | Like a post                 |
| `/api/posts/<id>/like/delete/`      | DELETE   | Unlike a post               |
| `/api/accounts/<id>/follow/`        | POST     | Follow a user               |
| `/api/accounts/<id>/follow/delete/` | DELETE   | Unfollow a user             |
| `/api/accounts/<id>/followers/`     | GET      | View followers              |
| `/api/accounts/<id>/following/`     | GET      | View following              |

## 🎯 Internship Task

This project was developed as **Task 2 of the CodeAlpha Full Stack Developer Internship**.

The project demonstrates full-stack development by integrating:

**React Frontend → REST API → Django Backend → Database**

## 📸 Screenshots

Screenshots of the application can be added here.

> Add screenshots of the Login, Home, Profile, Posts, Comments, and Follow features.

## 🔮 Future Improvements

Possible future enhancements include:

* Profile image uploads
* Post editing and deletion
* Image/media posts
* Notifications
* Search functionality
* Direct messaging
* Pagination
* Deployment to production
* Improved profile customization

## 👨‍💻 Author

**Ramesh Kumar Sonani**

Full Stack Developer

### Technologies

`React.js` • `Django` • `Django REST Framework` • `Python` • `Tailwind CSS` • `REST APIs` • `SQLite`

## 📄 License

This project was developed for educational and internship purposes as part of the CodeAlpha Full Stack Developer Internship.
