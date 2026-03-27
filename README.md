# 📊 Automated Data Collection & Quality Monitoring Platform

![Project Status](https://img.shields.io/badge/Status-Active_Monitoring-green)
![Stack](https://img.shields.io/badge/Stack-React_%2B_Node_%2B_MySQL-blue)

A full-stack ETL (Extract, Transform, Load) pipeline that automates data collection, enforces quality checks, and provides real-time monitoring via a WebSocket-connected dashboard.

## 🚀 Key Features
* **Automated ETL Pipeline:** Scheduled cron jobs scrape data from public APIs every minute.
* **Data Quality Engine:** Backend logic automatically rejects incomplete or anomalous data (e.g., negative prices or null values) before storage.
* **Real-time Alerting:** Uses **Socket.io** to push instant "System Critical" alerts to the frontend when data pipelines fail or ingest bad data.
* **Live Visualization:** React dashboard with **Chart.js** renders live data trends without page refreshes.

## 🛠 Tech Stack
* **Backend:** Node.js, Express, MySQL (Persistence), Node-Cron (Scheduling)
* **Frontend:** React (Vite), Chart.js (Visualization), Socket.io-client (Real-time)
* **DevOps & Architecture:** REST APIs, WebSockets, Automated ETL

## 🏗️ System Architecture

1. **Extraction (Cron):** A Node-Cron job pings external data sources at set intervals.
2. **Transformation & Quality Check:** Data is validated. Anomalies trigger an error event; valid data is formatted.
3. **Loading (MySQL):** Clean data is persistently stored in the relational database.
4. **Real-Time Broadcast (WebSockets):** Socket.io broadcasts the new data (or error alerts) to all connected frontend clients instantly.
5. **Visualization (React):** The dashboard catches the WebSocket event and smoothly updates the Chart.js graphs without requiring a browser refresh.

## ⚙️ Installation & Setup

### 1. Prerequisites
* Node.js (v18+)
* MySQL Server installed and running locally

### 2. Database Setup
Ensure your MySQL server is running, then execute the backend setup script to create the schema:
```sql
cd backend
node setup.js
```
### 3. Backend Setup
Navigate to the backend directory and install dependencies:

```sql
cd backend
npm install
```
Create a .env file in the backend folder and add your database credentials:

Code snippet
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=monitoring_db
PORT=5000
Start the backend server (this will also start the automated Cron jobs):

```sql
npm run dev
```
### 4. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:

```sql
cd frontend
npm install
```
Create a .env.local file in the frontend folder to point to your backend:

Code snippet
VITE_API_URL=http://localhost:5000
Start the Vite development server:

```sql
npm run dev
```
Visit http://localhost:5173 to view the live dashboard.

👨‍💻 Author
Naveen Sharma
B.Tech Computer Science (Data Science), Kazi Nazrul University, Asansol

[LinkedIn Profile](https://www.linkedin.com/in/naveen-sharma-a34365293) | [Portfolio Website](https://naveen-s-portfolio-one.vercel.app/) | [GitHub](https://github.com/naveencoding75/)
