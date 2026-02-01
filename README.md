# 🐼 Flying Panda Internal Tool (Visa Alert Tracker)

A mini internal tool built to track and manage visa slot alerts for international clients.

## 🛠 Setup Steps
1. **Backend**: 
   - `cd backend` -> `npm install` -> `npm start`
   - Server runs on `http://localhost:5000`
2. **Frontend**:
   - `cd frontend` -> `npm install` -> `npm start`
   - Runs on `http://localhost:3000`

## 🧠 Design Decisions
- **In-Memory Storage**: Since this is a mini-tool prototype, I used a global array. For production, I'd swap this for **PostgreSQL (Supabase)** to handle complex relations between users and alerts.
- **Custom Middleware**: I added a console logger. In a real environment, this would be replaced with **Morgan** or **Winston** to pipe logs into a service like Datadog.
- **REST Patterns**: Followed standard status codes (201 for Created, 204 for Deleted) to ensure the API is predictable.
- **Modern Styling**: (Tailwind CSS v4): Upgraded to the latest Tailwind v4 engine. I manually resolved PostCSS compatibility issues by implementing the @tailwindcss/postcss bridge, ensuring the tool uses the most performant CSS engine available.
- **Search Intelligence**:The filtering system supports partial matches for both Country and City. This allows staff to quickly drill down into specific regional offices.

## 🚀 Future Improvements
- **Real-time Updates**: Integrate **Socket.io** so that when a slot becomes "Booked," the dashboard updates for all staff instantly without refreshing.
- **Notification Engine**: Connect the backend to a **WhatsApp/Telegram Bot** API to notify users the second a slot opens.

## 🤖 AI Usage Note
- **Where AI helped**: Generating the basic CSS structure and setting up the `.gitignore`.
- **Where I thought**: Designing the query filtering logic, handling centralized errors, and ensuring the data model aligned with The Flying Panda’s actual visa business logic.