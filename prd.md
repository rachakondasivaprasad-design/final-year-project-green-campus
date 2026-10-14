# MASTER PROMPT — BUILD THE COMPLETE PROJECT

You are a senior full-stack software engineer, solution architect, UI/UX engineer, and AI application developer.

I have attached a Product Requirements Document (PRD) for my project:

**AI-Based Smart Green Campus Management and Environmental Monitoring System**

Your task is to **build the complete working web application based strictly on the attached PRD.**

Do not create a simple demo, static prototype, or landing page.

Build this as a **complete, functional, production-style full-stack application** that can be run locally.

---

# 1. IMPORTANT — READ THE PRD FIRST

Before writing code:

1. Read the entire attached PRD carefully.
2. Understand the product architecture, modules, user roles, features, data flow, APIs, database requirements, AI requirements, and future scope.
3. Use the PRD as the primary source of truth.
4. Do not remove important functionality from the PRD.
5. Do not replace the specified technology stack with another stack.
6. If something is not explicitly specified, make a sensible engineering decision that fits the existing architecture.
7. Do not ask me unnecessary questions. Make reasonable implementation decisions and continue building.

---

# 2. REQUIRED TECHNOLOGY STACK

Use the following stack:

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* Axios or equivalent API client
* A modern charting library such as Recharts
* Responsive UI

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

Implement secure authentication using:

* JWT
* Password hashing
* Protected routes
* Role-based authorization

## AI

Create a proper AI service abstraction.

The application should support AI-based:

* Environmental analysis
* Trend interpretation
* Anomaly detection
* Insight generation
* Recommendation generation

Do not hard-code fake AI text everywhere.

The AI layer must be structured so that an actual AI API can be connected later through environment variables.

For local/demo operation, provide a safe fallback/mock AI analysis service so that the application still works without an external AI API key.

---

# 3. CURRENT DATA REQUIREMENT

IMPORTANT:

The current version does NOT use physical IoT sensors.

Do NOT build hardware integration in the current implementation.

Use:

**Mock/seed environmental data + manual data entry**

The database must contain realistic historical environmental data so that the dashboard, charts, trends, anomaly detection, scoring, and AI analysis actually have meaningful data to work with.

Create a proper database seed script.

The seed data should include multiple months and multiple environmental parameters.

Example categories:

* Electricity
* Water
* Waste
* Paper
* Transportation
* Green areas
* Cleanliness

The system should not look empty immediately after installation.

Provide a command such as:

```bash
npm run seed
```

to populate MongoDB with demo data.

---

# 4. BUILD THE COMPLETE APPLICATION

Build all major modules defined in the PRD.

The application should include at minimum:

## Authentication

* Login
* Logout
* JWT authentication
* Protected routes
* Role-based access

Roles:

* ADMIN
* COORDINATOR
* STAFF
* VIEWER

---

# 5. MAIN APPLICATION PAGES

Create a professional application with pages such as:

### Authentication

* Login

### Main Application

* Dashboard
* Environmental Data
* Add Environmental Data
* Edit Environmental Data
* Analytics
* AI Insights
* Recommendations
* Alerts
* Reports
* Comparative Analysis
* Users
* Settings/Profile

Use React Router for navigation.

---

# 6. DASHBOARD

The dashboard must be the main control center.

Include:

## KPI Cards

* Environmental Score
* Electricity Consumption
* Water Consumption
* Waste Generated
* Paper Usage
* Green Area
* Active Alerts

## Charts

Include meaningful charts such as:

* Environmental score trend
* Electricity consumption trend
* Water consumption trend
* Waste trend
* Waste distribution
* Parameter comparison

## AI Section

Show:

* Latest AI insights
* Important environmental issues
* Recommendations
* Priority levels

## Alerts

Show:

* Informational alerts
* Warning alerts
* Critical alerts

The dashboard must be dynamic.

Do NOT hard-code dashboard values.

All values should come from backend APIs/database.

---

# 7. ENVIRONMENTAL DATA MODULE

Create proper forms for entering environmental data.

Support:

### Electricity

* Month
* Year
* Building
* Consumption
* Cost

### Water

* Month
* Year
* Building
* Consumption

### Waste

* Month
* Year
* Waste Type
* Quantity
* Recycled Quantity
* Non-Recycled Quantity

### Paper

* Month
* Year
* Department
* Consumption

### Transportation

* Month
* Year
* Transport Type
* Estimated Usage

### Green Space

* Area
* Green Area
* Trees
* Plants

### Cleanliness

* Location
* Cleanliness Score
* Inspection Date
* Remarks

Use proper:

* Form validation
* Error messages
* Loading states
* Success messages
* Empty states

---

# 8. ENVIRONMENTAL SCORE ENGINE

Implement an actual scoring service.

Score range:

```text
0–100
```

Use multiple environmental parameters to calculate the overall score.

The scoring logic must be centralized in a backend service rather than duplicated throughout the frontend.

Make the scoring weights configurable where practical.

The dashboard should show:

* Current score
* Score change
* Previous score
* Score trend
* Parameter-wise performance

---

# 9. ANALYTICS ENGINE

Implement backend analytics for:

* Historical comparison
* Monthly trends
* Yearly trends
* Parameter trends
* Building comparison
* Department comparison
* Consumption changes

The frontend should visualize the returned analytics using charts.

Do not perform all important calculations only on the frontend.

---

# 10. ANOMALY DETECTION

Implement a practical initial anomaly detection mechanism.

For example:

Compare current consumption against historical average/baseline.

If consumption exceeds a configured threshold, identify it as an anomaly.

Example:

```text
Historical average:
10,500 kWh

Current:
15,800 kWh

Result:
High electricity consumption anomaly
```

The logic should be reusable for:

* Electricity
* Water
* Waste
* Paper

Return structured anomaly information.

---

# 11. AI SERVICE

Create a dedicated backend AI service such as:

```text
services/ai.service.js
```

The AI service should accept structured environmental data and return structured results.

Example:

```json
{
  "overallStatus": "NEEDS_ATTENTION",
  "insights": [],
  "anomalies": [],
  "recommendations": []
}
```

The AI layer should support:

* Environmental performance analysis
* Pattern identification
* Trend analysis
* Anomaly interpretation
* Resource consumption analysis
* Recommendation generation

Use environment variables for external AI configuration.

Example:

```env
AI_API_KEY=
AI_MODEL=
```

Do NOT expose API keys in frontend code.

---

# 12. FALLBACK AI MODE

The application must work even when no external AI API key is available.

Implement a fallback analysis engine based on application data and predefined analytical rules.

For example:

If electricity increases significantly:

```text
Insight:
Electricity consumption has increased significantly.

Recommendation:
Review high-consumption areas and unnecessary equipment usage.
```

Clearly structure this as a fallback/mock AI service rather than pretending it is a real external AI model.

---

# 13. ALERT ENGINE

Create a backend alert service.

Alerts should be generated based on:

* Configured thresholds
* Detected anomalies
* Significant environmental changes

Severity:

```text
INFO
WARNING
CRITICAL
```

Each alert should contain:

* Type
* Parameter
* Message
* Severity
* Status
* Created date

Users should be able to view alerts from the dashboard and dedicated Alerts page.

---

# 14. RECOMMENDATION SYSTEM

Recommendations should be connected to actual analysis.

Each recommendation should contain:

* Parameter
* Issue
* Insight
* Recommended action
* Priority
* Created date

Example:

```text
Issue:
High electricity consumption

Insight:
Consumption increased significantly compared with historical usage.

Recommendation:
Review high-consumption buildings and reduce unnecessary electricity usage.

Priority:
HIGH
```

---

# 15. REPORTING

Create a Reports section.

Allow users to generate:

* Monthly report
* Annual report
* Comparative report

Reports should contain meaningful environmental information.

At minimum include:

* Environmental score
* Resource consumption
* Trends
* Alerts
* AI insights
* Recommendations

If PDF generation is practical within the selected stack, implement it. Otherwise provide a clean printable report view that can be exported through the browser.

---

# 16. COMPARATIVE ANALYSIS

Create a dedicated comparison interface.

Allow comparison of:

### Time

* Month vs Month
* Year vs Year

### Buildings

* Building A vs Building B

### Departments

* Department A vs Department B

### Parameters

* Electricity
* Water
* Waste
* Paper

Present comparisons through:

* Charts
* Tables
* Percentage changes
* Insights

---

# 17. DATABASE DESIGN

Use MongoDB + Mongoose.

Create clean models for at least:

```text
User
EnvironmentalRecord
Alert
Recommendation
```

You may create additional models where appropriate.

Use:

* Schema validation
* Timestamps
* Proper indexes where useful
* References where necessary

Do not store everything in one huge collection if separate collections provide a cleaner architecture.

---

# 18. BACKEND API

Use REST APIs.

Base path:

```text
/api/v1
```

Create APIs for:

### Auth

```text
POST /api/v1/auth/login
POST /api/v1/auth/register
GET  /api/v1/auth/me
POST /api/v1/auth/logout
```

### Environmental Data

```text
GET    /api/v1/environment
GET    /api/v1/environment/:id
POST   /api/v1/environment
PUT    /api/v1/environment/:id
DELETE /api/v1/environment/:id
```

### Dashboard

```text
GET /api/v1/dashboard/summary
GET /api/v1/dashboard/trends
GET /api/v1/dashboard/score
GET /api/v1/dashboard/alerts
```

### AI

```text
POST /api/v1/ai/analyze
GET  /api/v1/ai/insights
GET  /api/v1/ai/recommendations
```

### Reports

```text
GET  /api/v1/reports
POST /api/v1/reports/generate
GET  /api/v1/reports/:id
```

Add additional endpoints when necessary.

---

# 19. BACKEND ARCHITECTURE

Use a clean modular Express.js architecture.

Recommended:

```text
server/
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── validators/
├── seed/
└── server.js
```

Keep:

```text
Routes
↓
Controllers
↓
Services
↓
Models
↓
Database
```

Do not put all backend logic inside route files.

---

# 20. FRONTEND ARCHITECTURE

Use a clean React structure.

Recommended:

```text
client/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── context/
├── utils/
└── App.jsx
```

Create reusable components for:

* Cards
* Tables
* Charts
* Modals
* Forms
* Alerts
* Recommendation cards
* Loading states
* Empty states

---

# 21. UI/UX REQUIREMENTS

The application should look like a **modern professional SaaS/admin dashboard**, not a basic college project.

Design goals:

* Clean
* Modern
* Professional
* Environmental/green visual identity
* Responsive
* Easy to understand
* Minimal unnecessary decoration
* Strong visual hierarchy

Use a consistent design system.

Include:

* Sidebar navigation
* Top navigation
* Cards
* Tables
* Charts
* Badges
* Modals
* Toast notifications
* Loading skeletons
* Empty states
* Error states

Do not overcrowd the dashboard.

---

# 22. RESPONSIVE DESIGN

The application must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

The dashboard should adapt gracefully to smaller screens.

---

# 23. ERROR HANDLING

Implement proper error handling on both frontend and backend.

Backend:

* Central error middleware
* Consistent API response format
* Validation errors
* Authentication errors
* Database errors

Frontend:

* API error handling
* User-friendly error messages
* Loading states
* Empty states
* Retry where appropriate

Do not show raw stack traces to users.

---

# 24. SECURITY

Implement:

* Password hashing
* JWT authentication
* Protected routes
* Role-based authorization
* Input validation
* Environment variables
* No exposed secrets
* CORS configuration
* Secure API design

Never place secret API keys in React frontend code.

---

# 25. ENVIRONMENT VARIABLES

Create:

```text
.env.example
```

Example:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
AI_API_KEY=
AI_MODEL=
CLIENT_URL=
```

Do not commit real secrets.

---

# 26. MOCK DATA

Create realistic seed data.

The data should include:

* Multiple months
* Multiple years
* Multiple buildings
* Multiple environmental parameters
* Normal values
* Increasing trends
* Decreasing trends
* Some anomalous values

This is required so that analytics and AI features visibly work immediately after setup.

---

# 27. DEMO EXPERIENCE

After running:

```bash
npm install
```

and configuring MongoDB,

the application should be able to run with:

```bash
npm run dev
```

and the database should be populated using:

```bash
npm run seed
```

Provide clear README instructions.

---

# 28. README

Create a complete README containing:

1. Project overview
2. Features
3. Technology stack
4. Architecture
5. Folder structure
6. Environment setup
7. MongoDB setup
8. Installation
9. Seed instructions
10. Running frontend
11. Running backend
12. API overview
13. Demo credentials
14. AI configuration
15. Future IoT architecture

---

# 29. DEMO CREDENTIALS

Create seed users.

For example:

```text
Admin:
admin@greencampus.com

Coordinator:
coordinator@greencampus.com

Staff:
staff@greencampus.com

Viewer:
viewer@greencampus.com
```

Use a clearly documented demo password in the README.

Do not use production credentials.

---

# 30. IMPORTANT DEVELOPMENT RULES

### RULE 1

Do not create a static UI with fake frontend-only data.

The UI must communicate with the Express backend.

### RULE 2

Do not hard-code dashboard statistics.

Fetch them through APIs.

### RULE 3

Do not put database logic directly inside React.

### RULE 4

Do not put all backend logic inside one file.

### RULE 5

Keep AI logic isolated inside the AI service.

### RULE 6

Use reusable components.

### RULE 7

Use realistic mock data.

### RULE 8

Make the application actually runnable.

### RULE 9

Do not implement IoT hardware in the current version.

### RULE 10

Do not remove important PRD functionality simply because it is difficult.

---

# 31. DEVELOPMENT PROCESS

Follow this sequence:

## STEP 1

Analyze the PRD and create the technical architecture.

## STEP 2

Create the project structure.

## STEP 3

Implement backend and database models.

## STEP 4

Implement authentication and authorization.

## STEP 5

Implement environmental data APIs.

## STEP 6

Create MongoDB seed data.

## STEP 7

Implement analytics and scoring services.

## STEP 8

Implement alert engine.

## STEP 9

Implement AI service with fallback mode.

## STEP 10

Implement React frontend.

## STEP 11

Connect frontend to backend APIs.

## STEP 12

Implement dashboard visualizations.

## STEP 13

Implement reports and comparisons.

## STEP 14

Test all major user flows.

## STEP 15

Fix errors and polish UI/UX.

## STEP 16

Create final README and setup instructions.

---

# 32. QUALITY STANDARD

Do not stop after generating the first UI.

After implementation, inspect the complete project for:

* Broken imports
* Incorrect API routes
* Missing dependencies
* Database connection errors
* Authentication problems
* Role permission problems
* Invalid MongoDB queries
* Frontend/backend mismatches
* Empty dashboard states
* Chart errors
* Responsive layout problems
* Console errors

Fix issues before considering the project complete.

---

# 33. FINAL ACCEPTANCE CRITERIA

The project is considered complete only when:

* Frontend runs successfully.
* Backend runs successfully.
* MongoDB connects successfully.
* Seed data loads successfully.
* Login works.
* Role-based access works.
* Dashboard loads real API data.
* Environmental data CRUD works.
* Environmental score works.
* Charts work.
* Historical trends work.
* Anomaly detection works.
* Alerts work.
* AI analysis works in fallback mode without an API key.
* AI integration can be configured using environment variables.
* Recommendations work.
* Reports work.
* Comparison functionality works.
* Responsive design works.
* No major console errors remain.
* README explains the complete setup.

---

# 34. FINAL INSTRUCTION

Start by reading the attached PRD completely.

Then build the project.

Do not merely explain how to build it.

**Actually create the complete project files and implementation.**

Use the attached PRD as the primary product specification.

Make sensible engineering decisions where the PRD does not specify an implementation detail.

Prioritize:

**Functionality → Architecture → Data flow → AI → UI polish**

The final result should feel like a real **AI-powered Green Campus SaaS platform**, not a simple academic CRUD project.

Current implementation:

**MERN + AI + Mock Data**

Future implementation:

**MERN + AI + IoT + Real-Time Environmental Monitoring**

Do not implement future IoT hardware requirements in the current version.
