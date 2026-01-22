// backend/setup.js
const mysql = require('mysql2/promise');

async function createDB() {
  try {
    // 1. Connect to MySQL *without* specifying a database yet
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Naveen@75'
    });

    // 2. Create the database
    await connection.query(`CREATE DATABASE IF NOT EXISTS scraped_data`);
    console.log("✅ Database 'scraped_data' created successfully!");

    await connection.end();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

createDB();