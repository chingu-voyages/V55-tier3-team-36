import { db } from "@/db/drizzle";
import { dailyStats } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { and, eq, gte, lte } from "drizzle-orm";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const startOfWeek = dayjs().startOf("week").format("YYYY-MM-DD");
    const endOfWeek = dayjs().endOf("week").format("YYYY-MM-DD");

    const stats = await db
      .select({
        date: dailyStats.date,
        completionRate: dailyStats.completionRate,
      })
      .from(dailyStats)
      .where(
        and(
          eq(dailyStats.userId, userId),
          gte(dailyStats.date, startOfWeek),
          lte(dailyStats.date, endOfWeek)
        )
      );

    // Initialize full week data with 0s
    const data = {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    };

    for (const row of stats) {
      const dayOfWeek = new Date(row.date).getDay();
      data[dayOfWeek] = parseFloat(row.completionRate);
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("API /stats/week error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
