"use server";
import { db } from "@/db/drizzle";
import { user, habits, habitLogs, dailyStats } from "@/db/schema";
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

export async function logHabitCheck(userId, habitId, completed) {
  const today = new Date().toISOString().split("T")[0];

  const existing = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.userId, userId),
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.logDate, today)
      )
    );

  if (existing.length > 0) {
    await db
      .update(habitLogs)
      .set({ completed })
      .where(eq(habitLogs.log_id, existing[0].log_id));
  } else {
    await db.insert(habitLogs).values({
      user_id: userId,
      habit_id: habitId,
      log_date: today,
      completed,
    });
  }

  // Recalculate per-day stats across all habits
  await updateDailyStats(userId);

  // Optionally update streak for that habit
  const streakResult = await updateHabitStreak(userId, habitId);

  return {
    success: true,
    streak: streakResult.streak,
  };
}



export async function checkHabitLogForToday(userId, habitId) {
  if (!userId || !habitId) throw new Error("Missing userId or habitId");

  // Normalize the date to UTC midnight
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString().split("T")[0];

  const log = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.userId, userId),
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.logDate, todayISO)
      )
    );

  return log.length > 0 ? log[0] : null;
}


// Add a habit log entry
export async function addHabitLog(habitId, userId, date) {
  if (!habitId || !userId || !date) {
    throw new Error("Missing parameters for addHabitLog");
  }

  const existing = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.userId, userId),
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.logDate, date)
      )
    );

  if (existing.length > 0) {
    await db
      .update(habitLogs)
      .set({ completed: true })
      .where(eq(habitLogs.logId, existing[0].logId));
  } else {
    await db.insert(habitLogs).values({
      userId,
      habitId,
      logDate: date,
      completed: true,
    });
  }

  await updateDailyStats(userId);
}



// Delete a habit log entry
export async function deleteHabitLog(habitId, userId, date) {
  if (!habitId || !userId || !date) throw new Error("Missing parameters");

  const existing = await db
    .select()
    .from(habitLogs)
    .where(
      and(
        eq(habitLogs.userId, userId),
        eq(habitLogs.habitId, habitId),
        eq(habitLogs.logDate, date)
      )
    );

  if (existing.length > 0) {
    await db
      .update(habitLogs)
      .set({ completed: false })
      .where(eq(habitLogs.logId, existing[0].logId));

    await updateDailyStats(userId);
  }
}


// Calculate and return the current streak for a habit
export async function updateHabitStreak(userId, habitId) {
  if (!userId || !habitId) throw new Error("Missing userId or habitId");

  const logs = await db
    .select()
    .from(habitLogs)
    .where(
      and(eq(habitLogs.userId, userId), eq(habitLogs.habitId, habitId), eq(habitLogs.completed, true))
    );

  const dates = logs.map((log) => new Date(log.logDate));
  const dateSet = new Set(dates.map((d) => d.toISOString().split("T")[0]));

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  while (dateSet.has(currentDate.toISOString().split("T")[0])) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return { success: true, streak };
}

// Helper to update or insert into dailyStats
export async function updateDailyStats(userId) {
  const today = new Date().toISOString().split("T")[0];

  const allHabits = await db.select().from(habits).where(eq(habits.userId, userId));
  const totalHabits = allHabits.length;

  const logs = await db
    .select()
    .from(habitLogs)
    .where(and(eq(habitLogs.userId, userId), eq(habitLogs.logDate, today)));

  const completedHabits = logs.filter((log) => log.completed).length;
  const completionRate = totalHabits === 0 ? 0 : ((completedHabits / totalHabits) * 100).toFixed(2);

  // Check if an entry already exists
  const existing = await db
    .select()
    .from(dailyStats)
    .where(and(eq(dailyStats.userId, userId), eq(dailyStats.date, today)));

  if (existing.length > 0) {
    await db
      .update(dailyStats)
      .set({
        completedHabits,
        totalHabits,
        completionRate,
      })
      .where(eq(dailyStats.statId, existing[0].statId));
  } else {
    await db.insert(dailyStats).values({
      userId,
      date: today,
      completedHabits,
      totalHabits,
      completionRate,
    });
  }
}

export async function recalculateAllDailyStats(userId) {
  const logs = await db
    .select()
    .from(habitLogs)
    .where(eq(habitLogs.userId, userId));

  if (logs.length === 0) return;

  const logsByDate = {};
  for (const log of logs) {
    const logDate =
      typeof log.logDate === "string"
        ? new Date(log.logDate)
        : log.logDate;
    const dateKey = logDate.toISOString().split("T")[0];

    if (!logsByDate[dateKey]) logsByDate[dateKey] = [];
    logsByDate[dateKey].push(log);
  }

  const userHabits = await db
    .select()
    .from(habits)
    .where(eq(habits.userId, userId));

  const totalHabits = userHabits.length;
  if (totalHabits === 0) return;

  for (const dateKey of Object.keys(logsByDate)) {
    const completedHabits = logsByDate[dateKey].filter(
      (log) => log.completed
    ).length;

    const completionRate = parseFloat(
      ((completedHabits / totalHabits) * 100).toFixed(2)
    );

    const existing = await db
      .select()
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, userId),
          eq(dailyStats.date, dateKey)
        )
      );

    if (existing.length > 0) {
      await db
        .update(dailyStats)
        .set({
          completedHabits,
          totalHabits,
          completionRate,
        })
        .where(eq(dailyStats.statId, existing[0].statId));
    } else {
      await db.insert(dailyStats).values({
        userId,
        date: dateKey,
        completedHabits,
        totalHabits,
        completionRate,
      });
    }
  }
}
