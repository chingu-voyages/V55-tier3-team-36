import { relations } from "drizzle-orm/relations";
import { user, habitLogs, habits, account, session, dailyStats } from "./schema";

export const habitLogsRelations = relations(habitLogs, ({one}) => ({
	user: one(user, {
		fields: [habitLogs.userId],
		references: [user.id]
	}),
	habit: one(habits, {
		fields: [habitLogs.habitId],
		references: [habits.habitId]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	habitLogs: many(habitLogs),
	habits: many(habits),
	accounts: many(account),
	sessions: many(session),
	dailyStats: many(dailyStats),
}));

export const habitsRelations = relations(habits, ({one, many}) => ({
	habitLogs: many(habitLogs),
	user: one(user, {
		fields: [habits.userId],
		references: [user.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const dailyStatsRelations = relations(dailyStats, ({one}) => ({
	user: one(user, {
		fields: [dailyStats.userId],
		references: [user.id]
	}),
}));