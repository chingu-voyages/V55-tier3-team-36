import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { dailyStats } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const stats = await db
    .select()
    .from(dailyStats)
    .where(eq(dailyStats.userId, userId))
    .orderBy(dailyStats.date);

  if (!stats || stats.length === 0) {
    return NextResponse.json(
      { currentStreak: 0, bestStreak: 0, completionRate: 0 },
      { status: 200 }
    );
  }

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  let prevDate = null;

  for (let i = stats.length - 1; i > -0; i--) {
    const entry = stats[i];
    const date = new Date(entry.date);
    const isCompleted = entry.completedHabits === entry.totalHabits;

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

  const totalDays = stats.length;
  const completedDays = stats.filter(
    (s) => s.completedHabits === s.totalHabits
  ).length;
  const completionRate = ((completedDays / totalDays) * 100).toFixed(0);

  return NextResponse.json({
    currentStreak,
    bestStreak,
    completionRate,
  });
}
