import { db } from "@/db/drizzle";
import { dailyStats } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { eq, and, gte, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get("year"));
  const month = parseInt(searchParams.get("month")); // 0-indexed (Jan = 0)

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json({ error: "Invalid year/month" }, { status: 400 });
  }

  const start = new Date(Date.UTC(year, month, 1)).toISOString().split("T")[0];
  const end = new Date(Date.UTC(year, month + 1, 0)).toISOString().split("T")[0];

  const stats = await db
    .select()
    .from(dailyStats)
    .where(
      and(
        eq(dailyStats.userId, userId),
        gte(dailyStats.date, start),
        lte(dailyStats.date, end)
      )
    );

  const formatted = {};
  for (const s of stats) {
    const day = new Date(s.date).getUTCDate(); // get day of month
    formatted[day] = parseFloat(s.completionRate);
  }

  return NextResponse.json(formatted);
}
