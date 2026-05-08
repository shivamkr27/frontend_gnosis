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
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle pg client', err);
  process.exit(1);
});

const createTables = async () => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS battle_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        room_code VARCHAR(20) NOT NULL,
        type VARCHAR(10) CHECK (type IN ('1v1', 'group')),
        host_id UUID,
        subject_name VARCHAR(100),
        level_number INT,
        participants JSONB,
        results JSONB,
        created_at TIMESTAMP DEFAULT NOW()
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
