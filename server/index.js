const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', routes);

// Fallback to index.html for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Startup server (Standalone In-Memory Dummy Data Mode)
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Find My PKL server is running at: http://localhost:${PORT}`);
  console.log(`📦 Data Mode: In-Memory Standalone Dummy Data`);
  console.log(`⚡ Database Connection: DEACTIVATED (100% Mock Data)`);
  console.log(`====================================================`);
});
