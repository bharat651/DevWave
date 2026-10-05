const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Test connection on startup
// pool.query('SELECT NOW()', (err, result) => {
//   if (err) {
//     console.error('❌ Database Connection Failed!');
//     console.error('Error:', err.message);
//     console.error('Check: Database name, user, password, and if PostgreSQL is running');
//   } else {
//     console.log('✅ Database Connected Successfully!');
//     console.log('Current time from DB:', result.rows[0].now);
//   }
// });

pool.on('connect', () => {
  console.log('✓ Database connected');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
