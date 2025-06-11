"use server";

import { db } from "@/db/drizzle";

import { user, habits } from "@/db/schema";

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

// habit_id, user_id, habit_name, start_date, last_completed_date, habit_behavior, habit_when

// update user goal
export async function updateUserGoal(id, data) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    if (!data || !data.goal || !data.behavior || !data.when) {
      throw new Error('Missing required fields in form data');
    }

    // Ensure id is a string (UUID)
    const userId = typeof id === 'string' ? id : id.toString();
    const formData = data;
    const goal = formData.goal;
    const behavior = formData.behavior;
    const when = formData.when;

    // Format the date in ISO string format
    const startDate = new Date().toISOString();

    console.log('Attempting to insert habit with data:', {
      userId,
      habitName: goal,
      startDate,
      habitBehavior: behavior,
      habitWhen: when
    });

    const result = await db.insert(habits).values({
      userId: userId,
      habitName: goal,
      startDate: startDate,
      habitBehavior: behavior,
      habitWhen: when,
    });

    // Return a plain object with only the necessary data
    return { 
      success: true, 
      data: {
        userId,
        habitName: goal,
        startDate,
        habitBehavior: behavior,
        habitWhen: when
      }
    };
  } catch (error) {
    console.error('Error inserting habit:', error);
    throw new Error(`Failed to insert habit: ${error.message}`);
  }
}
