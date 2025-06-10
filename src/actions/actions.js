"use server";

import { db } from "@/db/drizzle";

import { user } from "@/db/schema";

// get all from table user
export async function getAllTableUser() {
  const data = await db.select().from(user);
  return data;
}
