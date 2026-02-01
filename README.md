🐼 Flying Panda Internal Tool (Visa Alert Tracker)
You're right! To make a README look professional and readable on GitHub, using proper Markdown symbols like #, ##, and * is essential for creating headers and lists. This documentation follows those standards to ensure clear communication of the project's architecture and setup.

🛠 Setup Steps
1. Backend
Navigate to the directory: cd backend

Install dependencies: npm install

Start the server: node server.js

Endpoint: http://localhost:5000

2. Frontend
Navigate to the directory: cd frontend

Install dependencies: npm install

Start the development server: npm run dev

Interface: http://localhost:5173 (Standard Vite Port)

🧠 Design Decisions & Engineering Choices
Modern Styling (Tailwind CSS v4): Upgraded to the latest Tailwind v4 engine. I manually resolved PostCSS compatibility issues by implementing the @tailwindcss/postcss bridge, ensuring the tool uses the most performant CSS engine available.

Product-Focused UX (Status Cycling): Implemented a one-click "Status Cycle" (Active → Booked → Expired). This design choice reduces operational friction for staff managing high volumes of visa slots.

Search Intelligence: The filtering system supports partial matches for both Country and City. This allows staff to quickly drill down into specific regional offices.

System Reliability: Integrated a Custom Logger Middleware to track every request's method, URL, and timestamp. This provides the audit trail necessary for debugging messy, real-world logistics systems.

Centralized Error Handling: Built a robust error-catching layer to ensure that even if a single request fails, the entire internal tool remains stable and responsive.

🚀 "Ready for Production" Improvements
Persistence Layer: Transition from volatile in-memory storage to PostgreSQL/Supabase to ensure data durability across server restarts.

Real-time Synchronization: Implement WebSockets (Socket.io) to push slot updates to all logged-in staff instantly without requiring a page refresh.

Automated Notifications: Integrate a Telegram/WhatsApp Bot to alert the operations team the moment a priority slot becomes "Active".

🤖 AI Usage & Human Engineering
Where AI helped: Boilerplate code for the initial Express setup and generating the basic CSS layout.

Where I thought:

Architecture: Designing the PUT and DELETE logic to handle IDs consistently between the frontend and backend.

Troubleshooting: Debugging the Tailwind v4 migration and PostCSS plugin shifts when standard tutorials failed.

Product Logic: Deciding to include City-level filtering based on The Flying Panda’s business model of managing multiple European visa centers.