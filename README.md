# 📊 Automated Data Collection & Quality Monitoring Platform

A full-stack ETL (Extract, Transform, Load) pipeline that automates data collection, enforces quality checks, and provides real-time monitoring via a WebSocket-connected dashboard.

![Project Status](https://img.shields.io/badge/Status-Active_Monitoring-green)
![Stack](https://img.shields.io/badge/Stack-MERN_%2B_MySQL-blue)

## 🚀 Key Features
* **Automated ETL Pipeline:** Scheduled cron jobs scrape data from public APIs every minute.
* **Data Quality Engine:** Backend logic automatically rejects incomplete or anomalous data (e.g., negative prices) before storage.
* **Real-time Alerting:** Uses **Socket.io** to push instant "System Critical" alerts to the frontend when data pipelines fail.
* **Live Visualization:** React dashboard with **Chart.js** renders live data trends without page refreshes.

## 🛠 Tech Stack
* **Backend:** Node.js, Express, MySQL (Persistence), Node-Cron (Scheduling)
* **Frontend:** React (Vite), Chart.js (Visualization), Socket.io-client (Real-time)
* **DevOps:** REST API, WebSockets, CORS handling

## ⚙️ Installation & Setup

### 1. Prerequisites
* Node.js installed
* MySQL Server installed and running locally

### 2. Database Setup
Run the setup script to create the database:
```bash
cd backend
node setup.js