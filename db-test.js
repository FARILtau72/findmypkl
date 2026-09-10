require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Testing TiDB Cloud Zero connection...');
  try {
    const conn = await mysql.createConnection({
      host: process.env.TIDB_HOST,
      port: Number(process.env.TIDB_PORT) || 4000,
      user: process.env.TIDB_USER,
      password: process.env.TIDB_PASSWORD,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    });

    console.log('Connected to TiDB successfully!');
    const [rows] = await conn.query('SELECT VERSION() as version, CURRENT_TIMESTAMP as server_time');
    console.log('Server info:', rows[0]);

    await conn.query('CREATE DATABASE IF NOT EXISTS findmypkl');
    console.log('Database findmypkl verified/created successfully!');
    await conn.end();
  } catch (err) {
    console.error('Failed to connect to TiDB:', err);
  }
}

testConnection();
