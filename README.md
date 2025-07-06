# iView Project Documentation

## Overview

iView is a platform designed to streamline online video interview processes, featuring a Node.js/TypeScript backend and two separate React-based frontends (admin panel and candidate side). Administrators can create question packages, manage interviews, and review candidates' video responses. Candidates can access the system via unique links and complete their video interviews. Videos are stored on AWS S3.

---

## Project Structure

```
backend/         # Node.js + TypeScript, Express, MongoDB
frontend/        # React-based admin panel
user-frontend/   # React-based candidate interface
```

---

## Backend

- **Technologies:** Node.js, TypeScript, Express, MongoDB, AWS S3
- **Getting Started:**  
  ```
  cd backend
  npm install
  npm run dev
  ```
- **Main File:** [backend/src/app.ts](backend/src/app.ts)
- **Features:**
  - Admin and user session management
  - Question package CRUD operations
  - Interview creation, deletion, and updating
  - Video upload, listing, and deletion (with AWS S3)
  - REST API endpoints: `/api/admin`, `/api/interview`, `/api/videos`, `/api/users`

---

## Frontend (Admin Panel)

- **Technologies:** React, Zustand, TailwindCSS, Axios
- **Getting Started:**  
  ```
  cd frontend
  npm install
  npm run dev
  ```
- **Main File:** [frontend/src/App.jsx](frontend/src/App.jsx)
- **Features:**
  - Admin login and session management
  - Create, edit, and delete question packages ([frontend/src/components/QuestionManagement.jsx](frontend/src/components/QuestionManagement.jsx), [frontend/src/components/ManagePackage.jsx](frontend/src/components/ManagePackage.jsx))
  - Create and list interviews ([frontend/src/components/JobPositionForm.jsx](frontend/src/components/JobPositionForm.jsx))
  - Watch and evaluate candidate videos ([frontend/src/pages/VideoCollectionPage.jsx](frontend/src/pages/VideoCollectionPage.jsx))
  - Update video status (Pass/Fail/Pending)
  - User-friendly and responsive interface

---

## User Frontend (Candidate Panel)

- **Technologies:** React, Zustand, TailwindCSS, Axios
- **Getting Started:**  
  ```
  cd user-frontend
  npm install
  npm run dev
  ```
- **Main File:** [user-frontend/src/App.jsx](user-frontend/src/App.jsx)
- **Features:**
  - Access via unique interview link
  - Personal information form ([user-frontend/src/components/userInformation.jsx](user-frontend/src/components/userInformation.jsx))
  - Question-based video recording ([user-frontend/src/components/VideoRecorder.jsx](user-frontend/src/components/VideoRecorder.jsx))
  - Upload recorded videos and receive completion notification
  - Access restriction for expired interviews

---

## Setup and Running

1. **Enter your MongoDB and AWS S3 settings in the .env files.**
2. Run `npm install` in each directory.
3. Start backend, frontend, and user-frontend applications in order.
4. Use the admin panel to create question packages and interviews, then send links to candidates.

---

## Key Files and Components

- **Backend**
  - [src/app.ts](backend/src/app.ts): Express server and route definitions
  - [src/services/QuestionPackageService.ts](backend/src/services/QuestionPackageService.ts): Question package operations
  - [src/services/videoServices.ts](backend/src/services/videoServices.ts): Video upload and deletion

- **Frontend**
  - [src/components/QuestionManagement.jsx](frontend/src/components/QuestionManagement.jsx): Question package management
  - [src/components/ManagePackage.jsx](frontend/src/components/ManagePackage.jsx): Edit question package details
  - [src/components/JobPositionForm.jsx](frontend/src/components/JobPositionForm.jsx): Create and list interviews
  - [src/pages/VideoCollectionPage.jsx](frontend/src/pages/VideoCollectionPage.jsx): Video collection and evaluation

- **User Frontend**
  - [src/components/userInformation.jsx](user-frontend/src/components/userInformation.jsx): Personal information form
  - [src/components/VideoRecorder.jsx](user-frontend/src/components/VideoRecorder.jsx): Video recording and upload

---

## Contribution and Development

- You can contribute by opening pull requests and issues.
- Please follow code standards and project structure.

---

## License

This project is licensed under the MIT License.

---

In summary, iView is a modern online interview system where administrators prepare question packages and manage interview processes, and candidates can record and upload video responses, all stored securely on AWS S3.