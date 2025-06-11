import { pgTable, foreignKey, serial, uuid, integer, date, boolean, text, timestamp, varchar, unique, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const habitLogs = pgTable("habit_logs", {
	logId: serial("log_id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	habitId: integer("habit_id").notNull(),
	logDate: date("log_date").notNull(),
	completed: boolean().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "habit_logs_user_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.habitId],
			foreignColumns: [habits.habitId],
			name: "habit_logs_habit_id_fkey"
		}).onDelete("cascade"),
]);

export const habits = pgTable("habits", {
	habitId: serial("habit_id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	habitName: text("habit_name").notNull(),
	startDate: timestamp("start_date", { mode: 'string' }).notNull(),
	lastCompletedDate: timestamp("last_completed_date", { mode: 'string' }),
	habitBehavior: varchar("habit_behavior", { length: 255 }),
	habitWhen: varchar("habit_when", { length: 255 }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "habits_user_id_fkey"
		}).onDelete("cascade"),
]);

export const user = pgTable("user", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text(),
	email: text().notNull(),
	emailVerified: timestamp("email_verified", { mode: 'string' }),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	onboarded: boolean().default(false),
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const account = pgTable("account", {
	id: serial().primaryKey().notNull(),
	userId: uuid().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_userId_user_id_fk"
		}).onDelete("cascade"),
	unique("accounts_provider_provider_account_id_key").on(table.provider, table.providerAccountId),
]);

export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: uuid().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_userId_user_id_fk"
		}).onDelete("cascade"),
]);

export const dailyStats = pgTable("daily_stats", {
	statId: serial("stat_id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	date: date().notNull(),
	completedHabits: integer("completed_habits").notNull(),
	totalHabits: integer("total_habits").notNull(),
	completionRate: numeric("completion_rate", { precision: 5, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "daily_stats_user_id_fkey"
		}).onDelete("cascade"),
	unique("daily_stats_user_id_date_key").on(table.userId, table.date),
]);
