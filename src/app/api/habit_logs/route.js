import { NextResponse } from 'next/server';
import { getHabitLogs } from '@/lib/db';

export async function GET() {
  try {
    const logs = await getHabitLogs();
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error fetching habit logs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
