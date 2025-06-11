"use server";

import { db } from "@/db/drizzle";

import { user } from "@/db/schema";

// get all from table user
export async function getAllTableUser() {
  const data = await db.select().from(user);
  return data;
}

// update user onboarding
// succesfully console logging id, now use to update table
// export async function completeUserOnboarding(userId) {
//   const id = userId;
//   console.log(id);
// }


// update user goal
export async function updateUserGoal(id, data) {
  const userId = id
  const formData = data
  
  // await db.insert()
}