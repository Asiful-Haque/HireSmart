 
#  HireSmart 💼

A simplified job platform backend built with **NestJS**, **PostgreSQL**, supporting JWT-based authentication, role-based access control, job listings, job applications, and background processing.



## 🛠️ Tech Stack


**🖥️ Back-end:** Nest.js

**🛢️ Database:** PostgreSQL

**🔑 Authentication:** JWT (JSON Web Token)

**🐳 Containerization:** Docker & Docker Compose

**⏱️ Scheduler:** @nestjs/schedule

**🛡️ Security:** Rate Limiting, Sanitization(XSS)










## 🌟 Features
1️⃣ Authentication & Authorization
- JWT-based login/logout.
- Roles: admin, employer, candidate.
- Role-based route access using guards.

2️⃣ For Employers
- Create, update, delete job listings.
- View their job listings.
- View applications for their jobs.

3️⃣ For Candidates
- Browse available jobs with filters (keyword, location)
- Apply to jobs.

4️⃣  For Admins

- View total metrics: jobs, users, applications
- Background Processing
- Match candidates to jobs (by skills, location, salary)
- Log or queue notifications when matches are found


5️⃣ Scheduled Tasks
- Archive jobs older than 30 days (runs daily)
- Remove unverified users older than 7 days (runs weekly)

6️⃣ Performance Optimization

- Prevent N+1 issues with proper query relations

7️⃣ Security
- Prevent SQL Injection via parameterized queries
- XSS protection using sanitization
- CSRF not applicable (Authorization header will be used)
- Rate-limiting on login & application endpoints










## 🔗 API Reference

#### 🔐 Auth

```http
  POST /auth/register - Register a new user
  POST /auth/login - Authenticate user and return a JWT token (5 req/min)
```

#### 👤 Users

```http
  POST /users - Create a new user
  GET /users/:email - Find user by email
```

#### 💼 Jobs

```http
  POST /jobs - Create a new job post (employer only)
  GET /jobs - Fetch all job posts
  GET /jobs/:id - Fetch a single job post by ID
  GET /jobs/employer/:employer_id - Fetch jobs created by a specific employer
  PUT /jobs/:id - Update a job post (employer only)
  DELETE /jobs/:id - Delete a job post (employer only)
```

#### 📄 Applications

```http
  POST /applications - Apply for a job (candidate only, 5 req/min)
  GET /applications/job/:job_id - Get all applications for a job (employer only)
  GET /applications/user/:candidate_user_id - Get a candidate’s own applications
```

#### 🛡️ Admin

```http
  GET /admin/metrics - Retrieve platform metrics (admin only)
  GET /admin/match-candidates - Get the matching jobs as per candidates information with job information
```






## 🐳 Docker Services

- app	--> NestJS API Server
- postgres --> PostgreSQL DB
- pgadmin -->	DB inspection GUI (optional)


## 🛢️ ERD

![Database](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1751183421/drawSQL-image-export-2025-06-29_1_rfskxa.png)



## 📥 Setup Instructions

Clone the Repository 🚀

```bash
  git clone https://github.com/Asiful-Haque/HireSmart.git
  cd hiresmart-backend
```
Configure Environment
```bash
  cp .env.example .env
  # Fill in your DB, and JWT secrets
```
Run with Docker
```bash
  docker-compose up --build
```
The app will be available at:
http://localhost:3000 (Though this endpoint is not working. You should see the api Reference part for actual working endpoints)

## Contributing

Contributions are always welcome!

**Future enhancements**
- Use Redis for 

      1. Recent job listings (5-minute TTL)

      2. Application stats per employer

- Normalize the Database (Suggested ERD):
![Database](https://res.cloudinary.com/ddrvm4qt3/image/upload/v1751183344/drawSQL-image-export-2025-06-29_2_zwfrn7.png)



## Feedback

If you have any feedback, please reach out to us at asiful35-2961@diu.edu.bd

## Badges

![AGPL License](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![AGPL License](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AGPL License](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![AGPL License](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![AGPL License](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AGPL License](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)
![AGPL License](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) 
![AGPL License](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![AGPL License](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)

