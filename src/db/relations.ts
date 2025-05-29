import { relations } from "drizzle-orm/relations";
import {
  users,
  habits,
  habitLogs,
  groups,
  groupMembers,
  habitVisibility,
  habitStats,
} from "./schema";

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.userId],
  }),
  habitLogs: many(habitLogs),
  habitVisibilities: many(habitVisibility),
  habitStats: many(habitStats),
}));

export const usersRelations = relations(users, ({ many }) => ({
  habits: many(habits),
  groupMembers: many(groupMembers),
  groups: many(groups),
  habitVisibilities: many(habitVisibility),
}));

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, {
    fields: [habitLogs.habitId],
    references: [habits.habitId],
  }),
}));

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.userId],
  }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  groupMembers: many(groupMembers),
  user: one(users, {
    fields: [groups.createdBy],
    references: [users.userId],
  }),
  habitVisibilities: many(habitVisibility),
}));

export const habitVisibilityRelations = relations(
  habitVisibility,
  ({ one }) => ({
    habit: one(habits, {
      fields: [habitVisibility.habitId],
      references: [habits.habitId],
    }),
    user: one(users, {
      fields: [habitVisibility.sharedWithUserId],
      references: [users.userId],
    }),
    group: one(groups, {
      fields: [habitVisibility.sharedWithGroupId],
      references: [groups.id],
    }),
  })
);

export const habitStatsRelations = relations(habitStats, ({ one }) => ({
  habit: one(habits, {
    fields: [habitStats.habitId],
    references: [habits.habitId],
  }),
}));
