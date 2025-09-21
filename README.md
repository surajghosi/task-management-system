# 📝 Task Management System

A full-stack **Task Management System** built with:

- **Backend**: .NET Core (Clean Architecture, Dapper, Repository + Unit of Work, Stored Procedures, Authentication)
- **Frontend**: React + TypeScript + Tailwind + React Router + Axios + Headless UI


---

## 📂 Project Structure

```
TaskManagementSystem/          # Backend (.NET Core API)
task_management_system_frontend/ # Frontend (React + TypeScript)
README.md
```

---

## ⚙️ Backend Setup (.NET Core API)

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet)
- EF In Memory used
- Visual Studio 2022 
### Configuration


4. Start the API:
   ```sh
   dotnet run
   ```
   API will be available at: https://localhost:7211/index.html. swagger

---

## 🎨 Frontend Setup (React + TypeScript)

### Prerequisites
- [Node.js (>=18)](https://nodejs.org/)
- [pnpm](https://pnpm.io/) or npm/yarn

### Configuration
1. Navigate to frontend folder:
   ```sh
   cd task_management_system_frontend
   ```

2. Install dependencies:
   ```sh
     npm install
   ```

   

3. Start the React app:
   ```sh
    npm run dev
   ```

Frontend will run at: `http://localhost:4200`.

---

## 🚀 Features

- 🔐 Secure Authentication 
- 📝 CRUD operations for tasks
- 👥 User Registration & Task assignment
- 📊 Dashboard with filters
- ✅ Unit tests for service layer (.NET )

---

## 🖼️ Screenshots

### Login Page
<img width="1397" height="852" alt="image" src="https://github.com/user-attachments/assets/3a1af916-58bc-4724-b2a7-64ebe9d6294f" />
<img width="1302" height="836" alt="image" src="https://github.com/user-attachments/assets/2f39f01a-d990-4fe9-915b-c5ea399a646f" />


### Dashboard
<img width="1870" height="666" alt="image" src="https://github.com/user-attachments/assets/5fef8970-c7d9-4b55-8994-8d727538188f" />
<img width="1576" height="900" alt="image" src="https://github.com/user-attachments/assets/420d9c34-bed3-4dfd-aa4c-76fd5813ac5d" />
<img width="1597" height="617" alt="image" src="https://github.com/user-attachments/assets/0bc7c5a8-1143-4670-8dca-0dccfe918c7d" />


## 🧪 Running Tests

### Backend (.NET Core)
```sh
dotnet test
```


---

## 📌 Tech Stack Summary

### Backend
- .NET Core 9
- Clean Architecture
- Repository 
- FluentValidation
  

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- React Router v6
- Axios (with interceptors)
- Headless UI (Dropdowns, Modals)
- React Hook Form + Yup


