# Gnosis — Complete Plan

## What We're Building
BTech students ke liye gamified learning platform. 25 subjects, linear path, XP system, real-time battles. Microservices architecture. DevSecOps pipeline baad mein.

## Tech Stack — Fixed
- Backend: Node.js + Express, PostgreSQL, Redis, Socket.io, Gemini API
- Frontend: React + Vite, Tailwind CSS, Axios, Socket.io-client, Zustand
- Infra: Docker + Docker Compose, baad mein AWS EKS

## 7 Microservices — Ports
- api-gateway: 3000 — Single entry, JWT verify, proxy
- auth-service: 3001 — Login, register, friends
- content-service: 3002 — Subjects, levels, questions, Gemini
- progress-service: 3003 — Unlock logic, streak
- xp-service: 3004 — XP ledger, leaderboard
- battle-service: 3005 — Socket.io, 1v1, group quiz
- notification-service: 3006 — Online presence, alerts

## Database — PostgreSQL
### 8 tables
- users — id, username, email, password_hash, total_xp, streak_count, last_active_date
- friendships — requester_id, receiver_id, status (pending/accepted)
- subjects — id, name, description, order_index
- levels — id, subject_id, level_number (1-4), topic, xp_reward, timer_seconds_easy, timer_seconds_hard
- questions — id, level_id, question_text, option_a/b/c/d, correct_options (JSONB array), question_type, timer_seconds, explanation
- user_progress — user_id, level_id, subject_id, status (locked/unlocked/complete), completed_at
- daily_activity — user_id, activity_date, levels_completed
- xp_ledger — user_id, amount, source, scope (global/room), room_id

### Redis keys
- gnosis:leaderboard:global — sorted set, weekly reset
- gnosis:online:{userId} — TTL 30s, heartbeat every 20s
- gnosis:room:{roomCode} — hash, room state during battle

## Pages — Complete List (16 pages total)
1. Landing Page `/`
   - Hero text "Master Tech. One Level at a Time."
   - Start Learning + Login buttons
   - 3 feature cards — Streaks, XP, Live Battles
   - Path preview neeche
   - Koi login nahi chahiye yahan
2. Login / Signup `/auth`
   - Do tabs — Login aur Sign Up
   - Email + password
   - JWT token milega, localStorage mein store hoga
   - Google/GitHub OAuth optional, baad mein add kar sakte
3. Home — Learning Path `/home`
   - Top bar: streak count, total XP, global rank
   - Main area: vertical path — circular nodes connected by dotted line
   - Har node = ek subject
   - Completed = green checkmark
   - Current = glowing/pulsing
   - Locked = grey padlock
   - Click karo node pe → subject detail page
   - Bottom nav: Home, Battle, Leaderboard, Profile
4. Subject Detail `/subject/:id`
   - Subject name + description
   - 4 level cards: Level 1 (unlocked/active) — topic, XP reward, estimated time, Play button
   - Level 2-4 locked jab tak 1 complete na ho
   - Level 1 complete → Level 2 unlock automatically
5. Active Quiz / Lesson `/lesson/:levelId`
   - Top: "Question 3/10", subject name, XP earned so far
   - Center: question text bold
   - 4 option buttons A B C D — click karo → immediately locked, no redo
   - Neeche: timer bar shrinks, red hota hai jab 3 seconds bacha
   - Server-side timer bhi track karta hai — agar time nikal gaya toh answer reject
   - Multi-correct questions mein instruction dikhega "Select all correct answers."
6. Quiz Review `/lesson/:levelId/review`
   - 8/10 CORRECT header, circular progress
   - Streak + XP earned
   - Detailed breakdown — har question: correct (green) ya incorrect (red), sahi answer highlight
   - Back to Results + Retry Level buttons
7. Lesson Complete `/lesson/:levelId/complete`
   - Trophy animation
   - "Lesson Complete!" XP breakdown — Base XP + Speed Bonus + Streak Bonus = Total
   - Streak card — X Days
   - Next level unlocked card dikhega agar unlock hua
   - "Back to Path" button
8. Battle Lobby `/battle`
   - Do tabs — "1v1 Challenge" aur "Group Quiz"
   - 1v1 tab: Friend list — avatar, username, level, green dot (online), Challenge button
   - Offline friends bhi dikhte hain but button disabled
   - Group Quiz tab: Do buttons — "Create Room" (host) aur "Join with Code" (participant)
   - Recent Battles history right side pe — won/lost, XP
9. 1v1 Waiting Room `/battle/waiting/:friendId`
   - Center: opponent ka avatar
   - "Waiting for response..." text
   - Subject + format info
   - CANCEL CHALLENGE button
   - Jab opponent accept kare → redirect to battle room automatically
10. Battle Quiz Room `/battle/room/:roomId`
    - Same as lesson quiz screen but real-time
    - Top pe opponent ka progress bhi dikh raha hai
    - Server questions bhejta hai — dono ko same time pe same question
    - 10 second server timer
    - Faster correct answer = zyada XP
    - Answer lock hone ke baad next question automatically aata hai server se
11. Battle Results `/battle/results/:roomId`
    - 1v1: YOU vs OPPONENT — points, VICTORY/DEFEAT
    - Battle XP breakdown
    - Play Again + Return to Lobby
    - Group: Top 3 podium — gold/silver/bronze
    - Har player ka naam + room XP
    - Full scoreboard sirf host ko
    - Back to Lobby button
12. Host — Create Group Quiz `/battle/host`
    - Left: Quiz Setup — subject name field, questions count stepper, timer per question stepper, difficulty tag
    - Right: Question Editor — question text, 4 options, "Mark Correct" toggle per option (multi-correct possible), Save Question
    - List of saved questions neeche
    - "Generate Sync Code" button when ≥1 question saved
13. Group Quiz Lobby `/battle/lobby/:roomCode`
    - Host view: Room code displayed large
    - Players joining — names appear in real-time as they join
    - "Start Quiz" button — disabled jab tak ≥2 players na ho
    - Participant view: "You've joined [Quiz Name]", hosted by [username]
    - Quiz instructions — questions count, timer, speed bonus active
    - Players in lobby grid
    - "Waiting for host to start..." pulsing
14. Leaderboard `/leaderboard`
    - "League of Scholars" header
    - Global / Friends toggle
    - Global: top 3 podium (2nd left, 1st center elevated, 3rd right) — avatar, username, XP, streak
    - Rank 4-20 in list below
    - Current user row always visible even if outside top 20 — highlighted
    - Weekly reset countdown timer top pe
    - Friends tab: Same list format, all-time XP, no reset
15. Profile `/profile/:userId`
    - Avatar + username + join date
    - 4 stat cards — Total XP, Current Streak, Subjects Completed, Global Rank
    - Your Progress section — subjects with % completion bars
    - Friends section — count, online dots, "View All" button
    - Agar apna profile — Settings + Share buttons
    - Agar dusre ka profile — Challenge button agar friend hai aur online hai
16. Friend Requests / Inbox `/friends`
    - Search bar — username se dhundo
    - Pending requests — accept/decline
    - Friends list — online status
    - Challenge button directly from friend list

## Key Logic — Final
- Lesson flow:
  - Content-service → random 10 from 50 pool → server stamps sent_at → user answers → gateway validates time → XP awarded → level marked complete → next level unlocked.
- Streak:
  - Daily login + ≥1 level complete = streak
  - Miss ek din = streak 0
  - Consecutive correct answers se koi fark nahi
- XP:
  - Lesson correct = +10
  - Speed <5s = +5 bonus
  - Level complete = +50
  - 7-day streak = +100
  - Multi-correct sirf fully correct pe = +15
  - Battle XP = room only, never global
- Leaderboard:
  - Global = weekly reset Monday 00:00, lesson XP only, top 20
  - Friends = all-time, lesson XP only
- 1v1:
  - Challenger picks subject+level
  - Gemini generates 10 fresh questions
  - Server controls timing
  - Room XP only
- Group quiz:
  - Host writes questions manually
  - Code join karo
  - Host start kare → auto-end after N×timer seconds
  - Top 3 sabko, full scores sirf host ko
- Anti-cheat:
  - Server timestamps every question
  - Answer received_at - sent_at > timer_seconds → rejected
  - Direct API call bhi fail — no room membership
- Online presence:
  - Client heartbeat every 20s → Redis key TTL 30s
  - Miss 2 heartbeats → offline automatically

## Build Sequence
1. Step 1 — DB setup (manual, 20 min)
   - PgAdmin mein gnosis database banao
   - Redis locally install karo ya Docker se
   - .env file — DB password, JWT secret, Gemini API key, Redis URL
2. Step 2 — Backend (AI Studio, service by service)
   - Auth → Content → Progress → XP → Battle → Notification → API Gateway
   - Har service ke baad /health endpoint test karo
3. Step 3 — Questions insert
   - JSON files ready hain
   - S3 bucket banao → Lambda function likho → upload karo → PostgreSQL mein auto-insert
   - Test: `/content/levels/:id/questions` → random 10 aane chahiye
4. Step 4 — Frontend
   - 16 pages banao
   - Mock data se shuru karo, phir real API wire karo
   - Socket.io events connect karo — battle, presence, notifications
5. Step 5 — Integration testing
   - Full flow test: Register → path → lesson → XP → leaderboard → add friend → 1v1 battle → group quiz
6. Step 6 — Docker
   - Har service ka Dockerfile
   - Docker Compose — sab services + postgres + redis ek saath
7. Step 7 — DevSecOps pipeline
   - Vishaka ki repo mein boutique replace karo Gnosis se
   - GitHub Actions CI → Trivy (container scan) + SonarQube (SAST) + OWASP ZAP (DAST) → ArgoCD → EKS deploy
   - Prometheus + Grafana monitoring add karo
