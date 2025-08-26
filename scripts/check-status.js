#!/usr/bin/env node

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`✅ Server is running! Status: ${res.statusCode}`);
  console.log(`🌐 Access the app at: http://localhost:3000`);
  process.exit(0);
});

req.on('error', (err) => {
  console.log('❌ Server is not running or not accessible');
  console.log('💡 Make sure to run: npm run dev');
  process.exit(1);
});

req.on('timeout', () => {
  console.log('⏰ Request timed out - server might be starting up');
  process.exit(1);
});

req.end();
