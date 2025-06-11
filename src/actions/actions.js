"use server";
import { db } from "@/db/drizzle";
import { user, habits } from "@/db/schema";
import { eq } from "drizzle-orm";

// get all from table user
export async function getAllTableUser() {
  const data = await db.select().from(user);
  return data;
}

// update user goal
export async function updateUserGoal(id, data) {
  try {
    if (!id) {
      throw new Error("User ID is required");
    }
    if (!data || !data.goal || !data.behavior || !data.when) {
      throw new Error("Missing required fields in form data");
    }
    const userId = typeof id === "string" ? id : id.toString();
    const formData = data;
    const goal = formData.goal;
    const behavior = formData.behavior;
    const when = formData.when;
    const startDate = new Date().toISOString();
    const result = await db.insert(habits).values({
      userId: userId,
      habitName: goal,
      startDate: startDate,
      habitBehavior: behavior,
      habitWhen: when,
    });

    return {
      success: true,
      data: {
        userId,
        habitName: goal,
        startDate,
        habitBehavior: behavior,
        habitWhen: when,
      },
    };
  } catch (error) {
    console.error("Error inserting habit:", error);
    throw new Error(`Failed to insert habit: ${error.message}`);
  }
}

// update onboarding status
export async function updateOnboardingStatus(id) {
  const userId = typeof id === "string" ? id : id.toString();
  await db
    .update(user)
    .set({
      onboarded: true
    })
    .where(eq(user.id, userId))
}
