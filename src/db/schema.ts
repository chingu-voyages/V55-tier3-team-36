import { pgTable, unique, serial, text, timestamp, foreignKey, check, integer, varchar, date, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	authProviderId: text("auth_provider_id").notNull(),
	email: text().notNull(),
	username: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	unique("users_auth_provider_id_key").on(table.authProviderId),
	unique("users_email_key").on(table.email),
]);

export const habits = pgTable("habits", {
	habitId: serial("habit_id").primaryKey().notNull(),
	userId: integer("user_id"),
	title: varchar({ length: 100 }).notNull(),
	description: text(),
	startDate: date("start_date").default(sql`CURRENT_DATE`),
	visibility: varchar().default('public'),
	currentStreak: integer("current_streak").default(0),
	lastCompletedDate: date("last_completed_date"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "habits_user_id_fkey"
		}).onDelete("cascade"),
	check("habits_visibility_check", sql`(visibility)::text = ANY ((ARRAY['public'::character varying, 'private'::character varying, 'friends'::character varying, 'groups'::character varying])::text[])`),
]);

export const habitLogs = pgTable("habit_logs", {
	logId: serial("log_id").primaryKey().notNull(),
	habitId: integer("habit_id"),
	date: date().notNull(),
	completed: boolean().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	foreignKey({
			columns: [table.habitId],
			foreignColumns: [habits.habitId],
			name: "habit_logs_habit_id_fkey"
		}).onDelete("cascade"),
	unique("habit_logs_habit_id_date_key").on(table.habitId, table.date),
]);

export const groupMembers = pgTable("group_members", {
	id: serial().primaryKey().notNull(),
	groupId: integer("group_id"),
	userId: integer("user_id"),
	role: varchar().default('member'),
	joinedAt: timestamp("joined_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [groups.id],
			name: "group_members_group_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "group_members_user_id_fkey"
		}).onDelete("cascade"),
	unique("group_members_group_id_user_id_key").on(table.groupId, table.userId),
	check("group_members_role_check", sql`(role)::text = ANY ((ARRAY['member'::character varying, 'admin'::character varying])::text[])`),
]);

export const groups = pgTable("groups", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	createdBy: integer("created_by"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [users.userId],
			name: "groups_created_by_fkey"
		}).onDelete("cascade"),
]);

export const habitVisibility = pgTable("habit_visibility", {
	id: serial().primaryKey().notNull(),
	habitId: integer("habit_id"),
	sharedWithUserId: integer("shared_with_user_id"),
	sharedWithGroupId: integer("shared_with_group_id"),
}, (table) => [
	foreignKey({
			columns: [table.habitId],
			foreignColumns: [habits.habitId],
			name: "habit_visibility_habit_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.sharedWithUserId],
			foreignColumns: [users.userId],
			name: "habit_visibility_shared_with_user_id_fkey"
		}),
	foreignKey({
			columns: [table.sharedWithGroupId],
			foreignColumns: [groups.id],
			name: "habit_visibility_shared_with_group_id_fkey"
		}),
	check("habit_visibility_check", sql`((shared_with_user_id IS NOT NULL) AND (shared_with_group_id IS NULL)) OR ((shared_with_user_id IS NULL) AND (shared_with_group_id IS NOT NULL))`),
]);

export const habitStats = pgTable("habit_stats", {
	statId: serial("stat_id").primaryKey().notNull(),
	habitId: integer("habit_id"),
	completedDates: date("completed_dates").array(),
	totalCompletedCount: integer("total_completed_count").generatedAlwaysAs(sql`array_length(completed_dates, 1)`),
	currentStreak: integer("current_streak").default(0),
}, (table) => [
	foreignKey({
			columns: [table.habitId],
			foreignColumns: [habits.habitId],
			name: "habit_status_habit_id_fkey"
		}).onDelete("cascade"),
]);
