import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

export async function getHabitLogs() {
  const result = await pool.query('SELECT * FROM habit_logs ORDER BY date DESC');
  return result.rows;
}

export default pool;
