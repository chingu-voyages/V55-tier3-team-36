import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

// Test the database connection
sql`SELECT 1`
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.error("Database connection failed:", error);
    throw error;
  });
