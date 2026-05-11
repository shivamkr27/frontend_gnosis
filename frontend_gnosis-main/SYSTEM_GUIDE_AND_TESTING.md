# Gnosis Gamified Learning Platform - System Guide and Testing Manual

This document provides a comprehensive guide on how to start all microservices (via Docker for backend/databases and npm for frontend) and how to run through the 12 phases of testing successfully.

---

## 🚀 How to Start the App

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18 or higher recommended)
- **Docker & Docker Compose** (to run the PostgreSQL and Redis containers, as well as the backend microservices if configured)
- **Git**

### 2. Starting the Backend Services (via Docker)
Most of the backend services, including the databases (PostgreSQL and Redis), are orchestrated via Docker Compose.

1. Open a terminal and navigate to the root directory of the project:
   ```bash
   cd frontend_gnosis-main
   ```
2. Build and start the containers in detached mode:
   ```bash
   docker-compose up --build -d
   ```
   *Note: This will start API Gateway, Auth Service, Battle Service, Content Service, Notification Service, Progress Service, XP Service, PostgreSQL, and Redis.*

3. **Verify running containers:**
   ```bash
   docker ps
   ```
   You should see all the services up and running. If any fail, check the logs:
   ```bash
   docker-compose logs -f <service_name>
   ```

### 3. Starting the Frontend App
1. Open a new terminal instance and navigate to the frontend directory:
   ```bash
   cd frontend_gnosis-main/frontend
   ```
2. Install the necessary Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (in the background if needed):
   ```bash
   npm run dev &
   ```
4. Access the frontend in your browser at: `http://localhost:5173`

---

## 🛑 How to Stop the App
To prevent "port already in use" errors for future runs, ensure you cleanly stop the services when you are done testing.

1. **Stop Frontend:**
   Go to the terminal where the dev server is running and press `Ctrl + C`, or kill the background process if started with `&`.
2. **Stop Docker Containers:**
   Navigate back to the project root and run:
   ```bash
   docker-compose down
   ```
   *(Optional) If you want to wipe the database volumes, you can use `docker-compose down -v`, but note this will delete all created users and progress.*

---

## 🧪 Testing Phases Guide

The following tests are structured logically. Critical bugs have already been fixed in the codebase (Auth JWT protection, Progress Ownership check, Rate limit to 100, UTC Date logic, etc).

For API tests, you can use `curl`, Postman, or Hoppscotch.

### Phase 1: Services Health Check
Check if all microservices are responding correctly.

```bash
curl -s http://localhost:3000/health
curl -s http://localhost:3001/health
curl -s http://localhost:3002/health
curl -s http://localhost:3003/health
curl -s http://localhost:3004/health
curl -s http://localhost:3005/health
curl -s http://localhost:3006/health
```
**Expected:** All should return `{ "status": "ok" }`.

### Phase 2: Auth Flow
1. **Register User 1 (Shivam):**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username": "shivam", "email": "shivam@test.com", "password": "password123"}'
   ```
2. **Login and save the TOKEN:**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email": "shivam@test.com", "password": "password123"}'
   ```
   *(Copy the "token" value from the response, this is your `SHIVAM_TOKEN`)*

3. **Register User 2 (Friend):**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
   -H "Content-Type: application/json" \
   -d '{"username": "testfriend", "email": "friend@test.com", "password": "password123"}'
   ```
   *(Login and save `FRIEND_TOKEN` just like above)*

### Phase 3: Friend System
1. **Send Friend Request (Shivam -> Friend):**
   *Replace `<FRIEND_UUID>` with the actual ID from the register/login response.*
   ```bash
   curl -X POST http://localhost:3000/auth/friend-request \
   -H "Authorization: Bearer <SHIVAM_TOKEN>" \
   -H "Content-Type: application/json" \
   -d '{"receiverId": "<FRIEND_UUID>"}'
   ```
2. **Accept Request (Friend):**
   ```bash
   curl -X POST http://localhost:3000/auth/friend-request/respond \
   -H "Authorization: Bearer <FRIEND_TOKEN>" \
   -H "Content-Type: application/json" \
   -d '{"requesterId": "<SHIVAM_UUID>", "action": "accept"}'
   ```

### Phase 4: Content Service
1. **Get Subjects:**
   ```bash
   curl -H "Authorization: Bearer <SHIVAM_TOKEN>" http://localhost:3000/content/subjects
   ```
2. **Get Level Questions:**
   Grab a `levelId` from the subjects response and test the questions endpoint.
   ```bash
   curl -H "Authorization: Bearer <SHIVAM_TOKEN>" http://localhost:3000/content/levels/<LEVEL_ID>/questions
   ```
   *Expected: 10 random questions, without `correct_options` exposed in the JSON.*

### Phase 5 & 6: Progress & XP Services
These are best tested via the Frontend Flow (Phase 9), as it automatically triggers `/progress/complete-level` and awards XP dynamically when you complete a quiz.

If you test the API manually, verify that completing a cross-user request fails:
```bash
curl -X POST http://localhost:3000/progress/complete-level \
-H "Authorization: Bearer <SHIVAM_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"userId": "<FRIEND_UUID>", "levelId": "...", "subjectId": "...", "xpEarned": 100}'
```
*Expected: `403 Forbidden` (This was explicitly fixed).*

### Phase 7: Online Presence
```bash
curl -X POST http://localhost:3000/notifications/online/batch \
-H "Content-Type: application/json" \
-d '{"userIds": ["<SHIVAM_UUID>", "<FRIEND_UUID>"]}'
```

### Phase 8: AWS / S3 / Lambda / Gemini Pipeline
*This phase is largely serverless/cloud-managed.*
Ensure `GEMINI_API_KEY` is present in the `.env` configuration of the `content-service` so AI-generated questions (1v1) function properly.
Test AI Questions:
```bash
curl -H "Authorization: Bearer <SHIVAM_TOKEN>" http://localhost:3000/content/levels/<LEVEL_ID>/questions/gemini
```

### Phase 9: Frontend End-to-End Flow (Manual Browser Testing)
1. Navigate to `http://localhost:5173`.
2. Register a new account (or login). You should land on `/home`.
3. Verify that 25 nodes (subjects) are generated in the learning path. The first node should be unlocked.
4. Click the first node and click "Play" on Level 1.
5. Answer the 10 real questions.
6. Observe the Result/Complete screen breaking down your XP and Streak.
7. Click "Continue" and verify that Level 2 is now unlocked on the `/home` screen.
8. Navigate to `/leaderboard` and verify data.
9. Navigate to `/profile` and verify your global rank, XP, and streak.

### Phase 10: Battle (Socket.io)
**Crucial Manual Test:**
1. Open Chrome window (Normal) -> Login as `shivam`.
2. Open Chrome window (Incognito) -> Login as `testfriend`.
3. Go to the "Battle" tab in both.
4. In Window A, check if `testfriend` has a green online dot.
5. In Window A, click "Challenge".
6. In Window B, accept the challenge.
7. Verify that both windows route to the battle interface and the questions sync simultaneously.

### Phase 11: Security Checks
1. **JWT Verification:**
   ```bash
   curl http://localhost:3000/content/subjects
   ```
   *Expected: `401 Unauthorized` (Fixed).*
2. **Rate Limiting:**
   Run a quick loop to trigger rate limits:
   ```bash
   for i in {1..150}; do curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/health; done
   ```
   *Expected: After 100 requests, it should start outputting `429 Too Many Requests` (Fixed limit from 500 down to 100).*

### Phase 12: Complete Audit
If all steps above pass gracefully, the Gnosis ecosystem is healthy. If you observe any minor desyncs during the Socket Battle flow, take screenshots and logs of the browser console for debugging.

---
**Note:** The system is completely configured for local testing. All critical security fixes, duplicate constraints, missing routes, and rate-limits have been patched.
