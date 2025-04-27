# 🏥 Health Information System

A simple, clean, and API-first health information management system for doctors to create health programs, register clients, enroll them into programs, and expose client profiles to external systems.

---

## 📦 Tech Stack

| Layer        | Tech                      |
|--------------|---------------------------|
| Frontend     | Next.js 15 (Vercel-hosted)|
| Backend      | Laravel 12 (Dockerized)   |
| Database     | PostgreSQL/MySQL          |
| Deployment   | Fly.io (Backend), Vercel (Frontend) |

---

## 🧱 System Design Overview

This system follows a **decoupled architecture** with separate services for frontend and backend. The Laravel backend provides RESTful APIs that the Next.js frontend consumes.

It includes:

- A Doctor-facing interface (web-based) to manage clients and programs
- A RESTful API backend to serve client/program data
- A public endpoint for exposing client profiles to external systems

---
## 🧠 Core Entities
* Client
  ```id```, ```first_name```, ```last_name```, ```dob```, ```gender```, ```contact_info```
* Program
  ```id```, ```name```, ```description```
* Description
  ```client_id```, ```program_id```, ```enrolled_at```
---
## 🔄 High-Level Flow

1. **Doctor creates a health program**  
    ```POST /api/programs```
2. **Doctor registers a client**
    ```POST /api/clients```
3. **Doctor enrolls client in one or more programs**
    ```POST /api/enrollments```
    Payload: ```{ client_id, program_ids[] }```
4. **Doctor searches for a client**
    ```GET /api/clients?search=john```
5. **Doctor views client profile**
    ```GET /api/clients/{id}```
   - Returns client information, with the programmes the client is enrolled in
6. **System exposes profile via public API**
    ```GET /api/public/clients/{id}/profile```
---

## 📐 Architecture Diagram

```plaintext
                         +----------------+
                         |    External    |
                         |   Systems/API  |
                         +-------+--------+
                                 |
                     GET /api/public/clients/{id}/profile
                                 |
                         +-------v--------+
                         |    Laravel     |
                         |    Backend     |
                         | (Fly.io + Docker)
                         +-------+--------+
                                 |
      +--------------------------+----------------------------+
      |                           |                            |
+-----v-----+             +-------v--------+           +-------v--------+
| Create    |             | Register Client|           | Enroll Client |
| Program   |             | Search/View    |           | In Program(s) |
+-----------+             +----------------+           +----------------
      \_________________API (RESTful JSON)___________________/
                                 |
                         +-------v--------+
                         |   Next.js UI   |
                         |   (Vercel)     |
                         +----------------+

```
---
# 🧩 Database Schema

```Clients ```

| Field         | Type          |
|---------------|---------------|
| id            | UUID / INT    |
| first_name    | String        |
| last_name     | String        |
| dob           | Date          |
| gender        | Enum          |
| contact_info  | String        |
| created_at    | Timestamp     |

```Programs```

| Field       | Type          |
|-------------|---------------|
| id          | UUID / INT    |
| name        | String        |
| description | Text          |
| created_at  | Timestamp     |

```client_program / join table``` 
| Field       | Type          |
|-------------|---------------|
| id          | UUID / INT    |
| client_id   | FK            |
| program_id  | FK            |
| enrolled_at | Timestamp     |

---
# 📡 API Structure

| Method | Endpoint                         | Description                         |
|--------|----------------------------------|-------------------------------------|
| POST   | ```/api/programs```                    | Create a new health program         |
| GET    | ```/api/programs```                    | List all programs                   |
| POST   | ```/api/clients```                     | Register a new client               |
| GET    | ```/api/clients```                     | Search/list clients                 |
| GET    | ```/api/clients/{id}```                | Get full client profile             |
| POST   | ```/api/enrollments```                 | Enroll client in programs         |
| GET    | ```/api/public/clients/{id}/profile``` | Publicly accessible client profile  |

---
# 🛡️ Security Considerations
* Input validation using Laravel FormRequest
* Public profile endpoint restricts sensitive fields

---
# ✅ To Run Locally

- If you are a developer and you want to set up this project on your local machine, do this:

```
# Backend

cd backend
cp .env.example .env
docker compose up -d --build
php artisan migrate --seed

# Frontend

cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```
---
# 🚀 Deployment


* **Frontend**: 
  - The frontend is hosted and deployed on [Vercel](https://vercel.com/), offering a fast, scalable, and global delivery platform.
  - Consumes backend API with dynamic configuration
 
* **Backend**: 
  - The backend API is hosted on [Fly.io](https://fly.io/), providing a globally distributed, low-latency environment for the Hrm Backend.
  - Dockerized and exposes secure restful API endpoints

 ---
 # 🧪 Future Enhancements
 *  ✅ Swagger documentation ```(/api/documentation)```
 *  ✅ Feature tests (Laravel)
 *  ✅ CI/CD pipelines
 *  ✅ Search filtering and pagination
 *  ✅ Authentication and admin login
 *  ✅ API versioning
 *  ✅ Secure Endpoints

---
# 🧠 Author
  ### Made with ❤️ by [Tevin Milla](https://millatevin-portfolio.vercel.app/)
  
  
