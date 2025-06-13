"use server";
import { db } from "@/db/drizzle";
import { user, habits } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";

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
      onboarded: true,
    })
    .where(eq(user.id, userId));
  redirect("/routes/dashboard");
}

// Get User Habits
export async function getHabits(userId) {
  if (!userId) {
    throw new Error("No userId provided");
  }

  const data = await db.select().from(habits).where(eq(habits.userId, userId));

  return data;
}

export async function updateHabit(habitId, userId, updatedData) {
  try {
    if (!habitId || !userId) {
      throw new Error("Missing habitId or userId");
    }

    await db
      .update(habits)
      .set({
        habitName: updatedData.habitName,
        habitBehavior: updatedData.habitBehavior,
        habitWhen: updatedData.habitWhen,
      })
      .where(and(eq(habits.habitId, habitId), eq(habits.userId, userId)));

    // ✅ Return a plain object
    return { success: true };
  } catch (error) {
    console.error("Error updating habit:", error);
    throw new Error(`Failed to update habit: ${error.message}`);
  }
}

export async function deleteHabit(habitId) {
  try {
    await db.delete(habits).where(eq(habits.habitId, habitId));
    return { success: true }; // ✅ only return plain JSON
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw new Error(`Failed to delete habit: ${error.message}`);
  }
}


