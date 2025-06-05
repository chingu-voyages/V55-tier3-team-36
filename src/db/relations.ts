import { relations } from "drizzle-orm/relations";
import {
  user,
  habits,
  habitLogs,
  groups,
  groupMembers,
  habitVisibility,
  habitStats,
} from "./schema";

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(user, {
    fields: [habits.userId],
    references: [user.id],
  }),
  habitLogs: many(habitLogs),
  habitVisibilities: many(habitVisibility),
  habitStats: many(habitStats),
}));

export const usersRelations = relations(user, ({ many }) => ({
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
  user: one(user, {
    fields: [groupMembers.userId],
    references: [user.id],
  }),
}));

export const groupsRelations = relations(groups, ({ one, many }) => ({
  groupMembers: many(groupMembers),
  user: one(user, {
    fields: [groups.createdBy],
    references: [user.id],
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
    user: one(user, {
      fields: [habitVisibility.sharedWithUserId],
      references: [user.id],
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
