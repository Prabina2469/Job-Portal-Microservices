# 🚀 Job Portal Microservices Platform

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-Microservices-brightgreen)
![React](https://img.shields.io/badge/React-Frontend-blue)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![Kafka](https://img.shields.io/badge/Kafka-Event%20Driven-black)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![License](https://img.shields.io/badge/License-Educational-yellow)

A full-stack enterprise-style Job Portal application built using a modern microservices architecture with Spring Boot, React, MySQL, Kafka, Docker, API Gateway, and Service Discovery.

---

## 🌟 Project Highlights

✅ Microservices Architecture
✅ JWT Authentication & Authorization
✅ API Gateway Routing
✅ Eureka Service Discovery
✅ Kafka-based Notification System
✅ Dockerized Infrastructure
✅ React Frontend Integration
✅ MySQL Database Integration
✅ RESTful APIs
✅ Enterprise-Level Project Structure

---

# Job Portal Microservices Platform

A full-stack microservices-based Job Portal platform built using Spring Boot, React, MySQL, Kafka, Docker, and modern cloud-native architecture principles.

---

# 🚀 Project Overview

This project is an enterprise-style Job Portal application developed using a microservices architecture. The platform supports authentication, job posting, applications, interview scheduling, notifications, and secure API communication.

The system is designed with scalability, modularity, and maintainability in mind.

---

# 🏗️ Architecture

## Backend Microservices

* Authentication Service
* Job Service
* Application Service
* Interview Service
* Notification Service
* API Gateway
* Service Discovery (Eureka)

## Frontend

* React.js
* Axios
* Context API
* React Router

## Database

* MySQL

## Messaging & Communication

* Apache Kafka

## DevOps & Infrastructure

* Docker
* Docker Compose
* GitHub

---

# ⚙️ Tech Stack

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Java                  | Backend Development            |
| Spring Boot           | Microservices Framework        |
| Spring Security + JWT | Authentication & Authorization |
| React.js              | Frontend UI                    |
| MySQL                 | Database                       |
| Kafka                 | Asynchronous Messaging         |
| Eureka                | Service Discovery              |
| API Gateway           | Centralized Routing            |
| Docker                | Containerization               |
| GitHub                | Version Control                |

---

# 📁 Project Structure

```text
Job-Portal/
│
├── authservice/
├── job-service/
├── application-service/
├── interview-service/
├── notification-service/
├── Api-Gateway/
├── Service-Discovery/
├── frontend/
├── docker-compose.yml
└── README.md
```

---

# 🔐 Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization

## Recruiter Features

* Post Jobs
* Manage Jobs
* View Applications
* Schedule Interviews

## Candidate Features

* Browse Jobs
* Apply for Jobs
* Track Application Status

## Notification System

* Kafka-based event-driven notifications
* Asynchronous message processing

---

# 🧠 Microservices Communication

The application follows a distributed microservices architecture.

* Eureka Server is used for service discovery.
* API Gateway handles centralized routing.
* Kafka is used for asynchronous event communication.
* REST APIs are used for synchronous communication.

---

# 🐳 Docker Setup

## Start Kafka & Zookeeper

```bash
docker compose up -d
```

## Stop Containers

```bash
docker compose down
```

---

# 💻 Frontend Setup (React)

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Start frontend

```bash
npm run dev
```

---

# ☕ Backend Setup (Spring Boot)

Open each microservice in IntelliJ IDEA and run:

```bash
mvn spring-boot:run
```

---

# 🗄️ MySQL Database Setup

Create database:

```sql
CREATE DATABASE jobportal;
```

Update application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

# 🌐 Environment Variables

## Frontend (.env)

```env
VITE_API_URL=http://localhost:8080
```

## Backend

```properties
server.port=${PORT:8080}
```

---

# 🔄 API Flow

1. User accesses React frontend
2. Frontend sends requests to backend APIs
3. API Gateway routes requests
4. Services communicate internally
5. Kafka handles asynchronous events
6. MySQL stores persistent data

---

# 📦 GitHub Push Setup

## Step 1 — Initialize Git

```bash
git init
```

## Step 2 — Add files

```bash
git add .
```

## Step 3 — Commit code

```bash
git commit -m "Initial Job Portal Microservices Project"
```

## Step 4 — Create GitHub Repository

Go to:

[https://github.com](https://github.com)

Create a new repository.

---

## Step 5 — Connect Local Project to GitHub

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

---

## Step 6 — Push Code

```bash
git push -u origin main
```

---

# 📸 Suggested Screenshots for GitHub

You can improve your GitHub repository by adding:

* Frontend Home Page
* Login Page
* Recruiter Dashboard
* Candidate Dashboard
* Swagger API Screenshots
* Kafka Logs
* Docker Containers Running

---

# 🎯 Future Enhancements

* Resume Parsing AI
* Email Notifications
* Kubernetes Deployment
* CI/CD Pipelines
* Cloud Deployment
* Real-Time Chat
* AI Interview Assistance

---

# 🧪 Testing

The application can be tested using:

* Postman
* Swagger UI
* Browser-based UI Testing

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

* Microservices Architecture
* Distributed Systems
* JWT Security
* Kafka Messaging
* API Gateway
* Service Discovery
* Docker Containerization
* Full Stack Development
* React + Spring Boot Integration

---

# 👨‍💻 Author

Developed as a full-stack enterprise microservices learning project.

---

# ⭐ Interview Highlights

This project showcases:

* Enterprise-grade architecture
* Scalable backend services
* Event-driven communication
* Secure authentication flow
* Full-stack integration
* Cloud-ready design principles

---

# 📄 License

This project is for educational and portfolio purposes.
