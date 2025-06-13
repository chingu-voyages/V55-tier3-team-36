import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/db/drizzle";
import { dailyStats } from "@/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";
import dayjs from "dayjs";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  if (!month) {
    return NextResponse.json(
      { error: "Month parameter is required" },
      { status: 400 }
    );
  }

  const startDate = dayjs(month + "-01")
    .startOf("month")
    .toDate();
  const endDate = dayjs(month + "-01")
    .endOf("month")
    .toDate();

  const rows = await db
    .select({
      date: dailyStats.date,
      completedHabits: dailyStats.completedHabits,
    })
    .from(dailyStats)
    .where(
      and(
        eq(dailyStats.userId, userId),
        gte(dailyStats.date, startDate),
        lte(dailyStats.date, endDate)
      )
    );

  const result = {};
  for (let row of rows) {
    const day = new Date(row.date).getDate();
    result[day] = row.completedHabits;
  }

  return NextResponse.json({ data: result });
}
