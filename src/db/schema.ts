import { pgTable, unique, serial, text, timestamp, foreignKey, check, integer, varchar, date, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const user = pgTable("user", {
	id: serial("id").primaryKey(), 
	name: text("name"),
	email: text("email").notNull(), 
	emailVerified: timestamp("email_verified", { mode: "date" }),
	image: text("image"), 
	createdAt: timestamp("created_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`), 
}, (table) => [
	unique("users_email_key").on(table.email),
]);

export const session = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(), 
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "cascade"}),
	expires: timestamp("expires").notNull(), 
});

export const account = pgTable("account", {
	id: serial("id").primaryKey(), 
	userId: integer("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
	type: text("type").notNull(), //OAuth 
	provider: text("provider").notNull(), //Google 
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
	}, (table) => [
		unique("accounts_provider_provider_account_id_key").on(table.provider, table.providerAccountId),
	]); 
