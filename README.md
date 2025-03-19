# 🚀 NestJS Backend Project

## 📖 Table of Contents
- [About]
- [Features]
- [Tech Stack]
- [Project Structure]
- [Installation]
- [Configuration]
- [Running the Project]
- [Running Tests]
- [API Documentation]
- [Environment Variables]

---

## 📌 About
This is a **NestJS-based backend application** designed for managing users, companies, projects, and permissions with role-based access control (RBAC).

---

## ✨ Features
✔️ **User Authentication (JWT & Passport.js)**  
✔️ **Role-based Access Control (RBAC) & Permissions**  
✔️ **Database Integration (MongoDB)**  
✔️ **CRUD Operations (Users, Projects, Companies, Permissions)**  
✔️ **Logging with Winston Logger**  
✔️ **Swagger API Documentation**  
✔️ **Unit & E2E Testing (Jest, Supertest)**  
✔️ **Database Seeding for Initial Data**  

---

## 🛠 Tech Stack
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript for scalability
- **[MongoDB](https://www.mongodb.com/)** - Database
- **[Passport.js](http://www.passportjs.org/)** - Authentication
- **[Jest](https://jestjs.io/)** - Testing framework
- **[Swagger](https://swagger.io/)** - API documentation
- **[Winston](https://github.com/winstonjs/winston)** - Logging

---

## Project Software Architecture Design
![Project Architecture Design](/diagram.png)


## 📁 Project Structure
```
📦 project-management-backend
├── 📂 src
│   ├── 📂 auth                 # Authentication & Authorization
│   │   ├── 📂 guards           # JWT & Local Auth Guards
│   │   ├── 📂 strategies       # JWT & Local Auth Strategies
│   │   ├── auth.controller.ts  # Auth Routes
│   │   ├── auth.module.ts      # Auth Module
│   │   ├── auth.service.ts     # Auth Logic
│   │   ├── permissions.decorator.ts  # Role-based permissions
│   ├── 📂 companies            # Company Module (CRUD)
│   │   ├── 📂 dto              # Data Transfer Objects (DTO)
│   │   ├── 📂 schemas          # Mongoose Schemas
│   │   ├── companies.module.ts # Companies Module
│   │   ├── companies.service.ts # Companies Service
│   ├── 📂 config               # Configuration & Logger
│   │   ├── winston-logger.config.ts  # Logging Configuration
│   ├── 📂 permissions          # Role-based permissions management
│   │   ├── 📂 dto              # DTOs
│   │   ├── 📂 schemas          # Mongoose Schemas
│   │   ├── permissions.module.ts # Permissions Module
│   │   ├── permissions.service.ts # Permissions Service
│   ├── 📂 projects             # Project Module (CRUD)
│   │   ├── 📂 dto              # DTOs
│   │   ├── 📂 schemas          # Mongoose Schemas
│   │   ├── projects.module.ts  # Projects Module
│   │   ├── projects.service.ts # Projects Service
│   ├── 📂 users                # User Module (CRUD)
│   │   ├── 📂 dto              # DTOs
│   │   ├── 📂 schemas          # Mongoose Schemas
│   │   ├── users.module.ts     # Users Module
│   │   ├── users.service.ts    # Users Service
│   ├── app.module.ts           # Root module
│   ├── main.ts                 # Entry point
│   ├── seed.ts                 # Database Seeder
├── 📂 test                     # Unit & E2E tests
├── 📄 .env                     # Environment variables
├── 📄 package.json             # Dependencies
├── 📄 nest-cli.json            # NestJS CLI configuration
├── 📄 README.md                # Project Documentation
```

---

## 🛠 Installation

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-username/nestjs-backend.git
cd nestjs-backend
```

### **2️⃣ Install dependencies**
```sh
npm install
```

---

## ⚙️ Configuration

### Set up Environment Variables (`.env`)
#### 1) Windows
Create a `.env` file in the root directory and configure:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nestjs-app
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600s
LOGGER_LEVEL=info
NODE_ENV=development
```

#### 2) Linux
Create a `.env` file in the root directory and configure:
```
PORT=3000
MONGODB_URI=mongodb://mongo:27017/nestjs-app
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600s
LOGGER_LEVEL=info
NODE_ENV=development
```
---

## 🚀 Running the Project

### **1️⃣ Start in Development Mode**
```sh
npm run start:dev
```
Access the API at: **`http://localhost:3000`**

Access the Swagger API documentation at: **`http://localhost:3000/documentation`**


### **2️⃣ Start in Production Mode**
```sh
npm run build
npm run start:prod
```

---

## ✅ Running Tests

### **1️⃣ Run Unit Tests**
```sh
npm run test
```

### **2️⃣ Run E2E (End-to-End) Tests**
```sh
npm run test:e2e
```

## ✅ Running project in Docker
```sh
docker compose up --build
```

---

## 📄 API Documentation
This project includes **Swagger API documentation**.

- **Access Swagger UI** at:  
  👉 `http://localhost:3000/documentation`
- **Swagger setup is located in** `src/main.ts`:
```typescript
const config = new DocumentBuilder()
  .setTitle('Project Management API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('documentation', app, document);
```

---

## 🌍 Environment Variables
| Variable              | Description                                  | Default |
|----------------------|----------------------------------|---------|
| `PORT`              | Server Port                      | `3000`  |
| `MONGODB_URI`       | MongoDB Connection String        | -       |
| `JWT_SECRET`        | Secret key for JWT authentication | -       |
| `JWT_EXPIRATION`    | Expiration time for JWT tokens (e.g., `3600s`) | `3600s` |
| `LOGGER_LEVEL`      | Logging level (`info`, `debug`, `warn`, `error`) | `info`  |
| `NODE_ENV`          | Environment (`development`, `production`) | `development` |

---

## Project Running result
![Project Architecture Design](/result_linux.png)

---
### I just simply implemented auth unit testing, and I will completely implement unit test cases if there is more time.
