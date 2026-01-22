// backend/server.js
require('dotenv').config(); // 1. Load environment variables

const express = require('express');
const mysql = require('mysql2/promise');
const cron = require('node-cron');
const cors = require('cors');
const http = require('http'); 
const { Server } = require("socket.io"); 
const { scrapeData } = require('./scraper');

const app = express();
app.use(cors());
app.use(express.json());

// Setup Socket.io
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});

// 2. Use variables from .env file
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',      
  password: process.env.DB_PASSWORD, // This is now safe!
  database: process.env.DB_NAME || 'scraped_data',
};

async function getDB() {
  return await mysql.createConnection(dbConfig);
}

// Schedule Scraper with Alerts
cron.schedule('*/1 * * * *', async () => {
  console.log('⏰ Cron Job triggered');
  const data = await scrapeData();
  
  // --- QUALITY CHECKS ---
  if (!data || data.price <= 0) {
    const errorMsg = "⚠️ Critical: Invalid Data Detected (Price <= 0)";
    console.log(errorMsg);
    
    // Send Alert
    io.emit("system_alert", { message: errorMsg, type: "error" });
    return; 
  }

  // Save to DB
  try {
    const connection = await getDB();
    const sql = 'INSERT INTO metrics (source, item, price, created_at) VALUES (?, ?, ?, ?)';
    await connection.execute(sql, [data.source, data.item, data.price, data.timestamp]);
    console.log('💾 Data saved to MySQL');
    await connection.end();
    
    // Update Frontend
    io.emit("data_update", { message: "New data saved!" });
    
  } catch (err) {
    console.error('Database Error:', err);
  }
});

// API Endpoint
app.get('/api/data', async (req, res) => {
  try {
    const connection = await getDB();
    const [rows] = await connection.execute('SELECT * FROM metrics ORDER BY created_at DESC LIMIT 10');
    await connection.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket running on port ${PORT}`);
});