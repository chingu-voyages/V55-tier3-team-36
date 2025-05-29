"use server";

import { db } from "@/db/drizzle";

import { habits, habitLogs } from "@/db/schema";

// get all habit logs
export async function getAllHabitLogs() {
  const data = await db.select().from(habitLogs);
  return data;
}
