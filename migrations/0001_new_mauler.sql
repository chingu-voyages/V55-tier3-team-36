CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	CONSTRAINT "accounts_provider_provider_account_id_key" UNIQUE("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "user_id" TO "id";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_auth_provider_id_key";--> statement-breakpoint
ALTER TABLE "habits" DROP CONSTRAINT "habits_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "group_members" DROP CONSTRAINT "group_members_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "groups" DROP CONSTRAINT "groups_created_by_fkey";
--> statement-breakpoint
ALTER TABLE "habit_visibility" DROP CONSTRAINT "habit_visibility_shared_with_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified" timestamp;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_visibility" ADD CONSTRAINT "habit_visibility_shared_with_user_id_fkey" FOREIGN KEY ("shared_with_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "auth_provider_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "username";