# GetDomus Task Manager & Coordination Hub

A specialized full-stack application designed to solve the challenges of managing distributed onshore and offshore teams. This hub focuses on **timezone awareness** and **live availability tracking** to prevent out-of-hours task assignments and improve global team synchronization.

---

## 🚀 Core Features

- **Real-time Global Dashboard:** Live clocks for every team member that update automatically, providing an instant snapshot of global team time.
- **Intelligent Availability Tracking:** Visual "Off-Hours" indicators (Moon icons and Red status alerts) for members currently outside the standard 9 AM - 6 PM working window.
- **Global Team Directory:** Support for over 400+ IANA timezones using a searchable autocomplete interface.
- **Strict Data Integrity:** Backend validation prevents task assignment to non-existent users and handles data-type errors (e.g., non-numeric IDs).
- **Modular Component Architecture:** Built with high maintainability in mind, utilizing a clear separation of concerns between state management and UI components.

---

## 🛠 Tech Stack

### Frontend
- **React (Vite):** Fast, modern component-based architecture.
- **Tailwind CSS:** Professional, minimalist UI styling.
- **Lucide React:** Scalable, consistent iconography.
- **Axios:** Robust HTTP client for API communication.

### Backend
- **FastAPI (Python):** High-performance, asynchronous API framework.
- **SQLAlchemy:** ORM for reliable MySQL data modeling.
- **Pytz:** Precise timezone calculations and DST handling.

### Database
- **MySQL:** Relational storage using a Many-to-Many assignment model.

---

## 🏗 Architecture Narrative

This project implements a **Three-Tier Architecture**:
1. **Presentation Layer (React):** Manages the "Source of Truth" in the main App controller, distributing data to modular components like `TaskCard` and `TeamDirectory`.
2. **Logic Layer (FastAPI):** Normalizes incoming data and calculates time offsets on-the-fly to ensure the client-side clocks remain accurate.
3. **Persistence Layer (MySQL):** Uses an association table to link users and tasks, maintaining 3NF (Third Normal Form) standards and ensuring referential integrity.

---

## 📦 Installation & Setup

### 1. Prerequisites
- Python 3.10+
- Node.js & npm
- MySQL Server

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Ensure your MySQL credentials are set in database.py
python init_db.py
uvicorn main:app --reload
```
### 3. Frontend Setup
```bash
# Open a new terminal tab
cd frontend
npm install
npm run dev
```

### 4. Database Initialization
Before running the backend, ensure your MySQL server is running and create the database:
```sql
CREATE DATABASE getdomus_db;
```
