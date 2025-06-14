import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { dailyStats } from "@/db/schema";
import { eq, and, gte } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { recalculateAllDailyStats } from "@/actions/actions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Recalculate all stats first to be sure
  await recalculateAllDailyStats(userId);

  // Calculate 7 days ago date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6); // includes today (7 days total)

  const stats = await db
    .select()
    .from(dailyStats)
    .where(
      and(
        eq(dailyStats.userId, userId),
        gte(dailyStats.date, sevenDaysAgo.toISOString().split("T")[0])
      )
    )
    .orderBy(dailyStats.date);

  if (!stats || stats.length === 0) {
    return NextResponse.json(
      { currentStreak: 0, bestStreak: 0, completionRate: "0.00" },
      { status: 200 }
    );
  }

  // --- Streak Calculation ---
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;
  let prevDate = null;

  for (let i = stats.length - 1; i >= 0; i--) {
    const entry = stats[i];
    const date = new Date(entry.date);
    const isCompleted = entry.completedHabits > 0;

    if (isCompleted) {
      if (
        prevDate === null ||
        (prevDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) === 1
      ) {
        tempStreak++;
        currentStreak = tempStreak;
      } else {
        tempStreak = 1;
      }
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 0;
      if (prevDate === null) currentStreak = 0;
    }

    prevDate = date;
  }

  // --- Last 7-Day Completion Rate ---
  const recentCompletedDays = stats.filter(
    (s) => s.completedHabits === s.totalHabits
  ).length;
  const completionRate =
  stats.reduce((sum, stat) => sum + parseFloat(stat.completionRate), 0) /
  stats.length;

  return NextResponse.json({
    currentStreak,
    bestStreak,
    completionRate,
  });
}
