const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(1);
});

const createTables = async () => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS xp_ledger (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL,
        username VARCHAR(50) NOT NULL,
        amount INT NOT NULL,
        source VARCHAR(30) CHECK (source IN (
          'lesson', 'streak_bonus', 'level_complete', 'battle'
        )),
        scope VARCHAR(10) CHECK (scope IN ('global', 'room')),
        room_id VARCHAR(20),
        awarded_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('Tables created or already exist');
  } catch (err) {
    console.error('Error creating tables', err);
    process.exit(1);
  }
};

createTables();

module.exports = pool;
