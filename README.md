# AI-Based Smart Green Campus Management and Environmental Monitoring System

A full-stack, AI-powered environmental monitoring and sustainability governance platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

The platform features real-time resource tracking, dynamic 0–100 sustainability scoring, statistical anomaly detection, rule-based & LLM AI diagnostic analysis, automated eco-action recommendations, filterable alert hubs, and downloadable environmental compliance reports.

---

## 🌟 Key Features

1. **Dynamic Sustainability Scoring Engine (0-100)**: Multi-parameter scoring algorithm evaluating Electricity efficiency, Water conservation, Waste recycling ratios, Green canopy coverage, Cleanliness index, and Sustainable transport.
2. **AI Intelligence Layer & Fallback Engine**: Configurable AI abstraction supporting Google Gemini / OpenAI LLM APIs with an automated deterministic Fallback Analysis Engine when no API key is set.
3. **Statistical Anomaly Detection**: Baseline comparison detecting consumption surges (>20% deviation) across campus buildings.
4. **Interactive Dashboard**: KPI cards, score gauge, historical trend area charts (Recharts), recent alerts widget, and AI pattern diagnostic cards.
5. **Environmental Data Hub**: Full CRUD operations for Electricity, Water, Waste, Paper, Transportation, Green Space, and Cleanliness logs with multi-filter search and pagination.
6. **Role-Based Access Control (RBAC)**: Enforced governance across 4 roles: `ADMIN`, `COORDINATOR`, `STAFF`, and `VIEWER`.
7. **Actionable Eco-Recommendations**: Prioritized sustainability initiatives (HIGH, MEDIUM, LOW) with estimated cost/resource impacts and status tracking (`PROPOSED`, `IN_PROGRESS`, `IMPLEMENTED`).
8. **Alert & Event Monitoring Center**: Filterable severity hub (`CRITICAL`, `WARNING`, `INFO`) with status workflow (`ACTIVE`, `ACKNOWLEDGED`, `RESOLVED`).
9. **Environmental Audit Reports**: Printable and downloadable monthly, annual, and comparative audit report views.
10. **Comparative Analysis Matrix**: Side-by-side time (Month vs Month) and building (Block A vs Block B) variance benchmarking.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router v6, Recharts, Lucide React Icons, Custom Dark Glassmorphism CSS design system.
- **Backend**: Node.js, Express.js, JWT Authentication, Bcryptjs password hashing, Centralized Error Handling Middleware.
- **Database**: MongoDB & Mongoose ODM (with automatic in-memory fallback via `mongodb-memory-server` if local MongoDB is offline).
- **AI Service**: Dedicated AI Service Abstraction (`server/services/ai.service.js`) with rule-based Fallback Analysis Engine and Gemini/OpenAI API bindings.

---

## 📁 Repository Structure

```text
1st-pro/
├── package.json              # Root script runner (concurrently)
├── .env.example              # Root environment variables guide
├── prd.md                    # Primary Product Requirements Document
├── README.md                 # Documentation
├── server/
│   ├── package.json          # Express backend dependencies
│   ├── .env                  # Backend configuration
│   ├── server.js             # Express application entry
│   ├── config/
│   │   └── db.js             # MongoDB connection with MongoMemoryServer fallback
│   ├── models/               # Mongoose Schemas (User, EnvironmentalRecord, Alert, Recommendation, Report)
│   ├── routes/               # REST API endpoints (/auth, /environment, /dashboard, /ai, /alerts, /reports, /analytics, /users)
│   ├── controllers/          # Request handlers
│   ├── services/             # Scoring, Anomaly Detection, Alert, AI Engine, Analytics, and Report services
│   ├── middleware/           # Auth JWT & RBAC role authorization
│   └── seed/
│       └── seed.js           # Multi-month demo dataset & accounts seeder
└── client/
    ├── package.json          # React frontend dependencies
    ├── vite.config.js        # Vite dev server & API proxy
    ├── index.html            # Web entry point
    └── src/
        ├── index.css         # Modern dark glassmorphic green design system
        ├── App.jsx           # Router & App layout shell
        ├── context/          # AuthContext provider
        ├── services/         # Axios API client layer
        ├── components/       # Reusable KPI cards, score gauge, charts, modals, sidebar, navbar
        └── pages/            # Login, Dashboard, EnvironmentalData, Analytics, AiInsights, Recommendations, Alerts, Reports, ComparativeAnalysis, UserManagement, Settings
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- *(Optional)* MongoDB running locally on `mongodb://127.0.0.1:27017` (If MongoDB is not installed or offline, the application automatically launches an in-memory MongoDB database so it runs out-of-the-box seamlessly!).

### 2. Installation
From the root workspace directory, install dependencies for root, server, and client:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Seed Database
Populate the database with 12 months of historical environmental records, demo alerts, recommendations, and demo user accounts:

```bash
cd server
npm run seed
```

### 4. Running the Full-Stack Application

To start both the Express backend (port 5000) and React Vite frontend (port 5173):

#### Option A: Running from root using concurrently
```bash
npm run dev
```

#### Option B: Running individually
In terminal 1 (Backend):
```bash
cd server
npm start
```

In terminal 2 (Frontend):
```bash
cd client
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 Demo Login Credentials

The seed script creates demo accounts across all 4 role permission levels:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Admin** | `admin@greencampus.com` | `Password123!` | Full system access, manage users, edit/delete logs, configure system |
| **Coordinator** | `coordinator@greencampus.com` | `Password123!` | Manage environmental data, trigger AI scans, manage alerts & recommendations, generate reports |
| **Staff** | `staff@greencampus.com` | `Password123!` | Submit environmental logs, update alert statuses, view dashboard |
| **Viewer** | `viewer@greencampus.com` | `Password123!` | Read-only access to dashboard, analytics, charts, and reports |

---

## 🧠 AI Configuration (LLM API vs Fallback Mode)

The system includes a dedicated AI abstraction layer (`server/services/ai.service.js`).

### Default Mode: Fallback Analysis Engine
If no `AI_API_KEY` is specified in `server/.env`, the system runs the **Deterministic Fallback Engine**. This engine analyzes real database records, calculates score variations, checks statistical anomaly baselines, and generates structured JSON insights and recommendations.

### External LLM Integration (Google Gemini / OpenAI)
To connect a live LLM model:
1. Open `server/.env`.
2. Set your API key and provider:
   ```env
   AI_PROVIDER=gemini
   AI_API_KEY=your_gemini_api_key_here
   AI_MODEL=gemini-1.5-flash
   ```
3. Restart the backend server. The AI service will route analysis through the external model.

---

## 🔮 Future IoT Expansion Architecture (Phase 2 Roadmap)

While the current release uses mock/seed data and manual entry per PRD requirements, the application architecture is prepared for IoT hardware integration:

```text
[ IoT Hardware Sensors ]  (ESP32 / Current Transformers / Ultrasonic Flow / Smart Bin Sensors)
           ↓
[ IoT Gateway / Broker ]  (MQTT Broker / LoRaWAN Gateway)
           ↓
[ Express REST Ingest ]   (POST /api/v1/iot/telemetry)
           ↓
[ MongoDB TimeSeries ]    (EnvironmentalRecords collection)
           ↓
[ AI Analytics Engine ]   (Real-time scoring & anomaly threshold evaluation)
           ↓
[ React Live Dashboard ]  (WebSockets / Server-Sent Events real-time alerts)
```

---

## 📄 License
This project is licensed under the MIT License.
