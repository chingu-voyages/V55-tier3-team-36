import pool from '@/lib/db';

export async function GET() {
  try {
    const res = await pool.query('SELECT NOW()');
    return Response.json({ connected: true, serverTime: res.rows[0].now });
  } catch (error) {
    return Response.json({ connected: false, error: error.message }, { status: 500 });
  }
}
