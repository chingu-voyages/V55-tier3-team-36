-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"auth_provider_id" text NOT NULL,
	"email" text NOT NULL,
	"username" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_auth_provider_id_key" UNIQUE("auth_provider_id"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"habit_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(100) NOT NULL,
	"description" text,
	"start_date" date DEFAULT CURRENT_DATE,
	"visibility" varchar DEFAULT 'public',
	"current_streak" integer DEFAULT 0,
	"last_completed_date" date,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "habits_visibility_check" CHECK ((visibility)::text = ANY ((ARRAY['public'::character varying, 'private'::character varying, 'friends'::character varying, 'groups'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "habit_logs" (
	"log_id" serial PRIMARY KEY NOT NULL,
	"habit_id" integer,
	"date" date NOT NULL,
	"completed" boolean NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "habit_logs_habit_id_date_key" UNIQUE("habit_id","date")
);
--> statement-breakpoint
CREATE TABLE "group_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer,
	"user_id" integer,
	"role" varchar DEFAULT 'member',
	"joined_at" timestamp DEFAULT now(),
	CONSTRAINT "group_members_group_id_user_id_key" UNIQUE("group_id","user_id"),
	CONSTRAINT "group_members_role_check" CHECK ((role)::text = ANY ((ARRAY['member'::character varying, 'admin'::character varying])::text[]))
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_by" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "habit_visibility" (
	"id" serial PRIMARY KEY NOT NULL,
	"habit_id" integer,
	"shared_with_user_id" integer,
	"shared_with_group_id" integer,
	CONSTRAINT "habit_visibility_check" CHECK (((shared_with_user_id IS NOT NULL) AND (shared_with_group_id IS NULL)) OR ((shared_with_user_id IS NULL) AND (shared_with_group_id IS NOT NULL)))
);
--> statement-breakpoint
CREATE TABLE "habit_stats" (
	"stat_id" serial PRIMARY KEY NOT NULL,
	"habit_id" integer,
	"completed_dates" date[],
	"total_completed_count" integer GENERATED ALWAYS AS (array_length(completed_dates, 1)) STORED,
	"current_streak" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_logs" ADD CONSTRAINT "habit_logs_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("habit_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_visibility" ADD CONSTRAINT "habit_visibility_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("habit_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_visibility" ADD CONSTRAINT "habit_visibility_shared_with_user_id_fkey" FOREIGN KEY ("shared_with_user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_visibility" ADD CONSTRAINT "habit_visibility_shared_with_group_id_fkey" FOREIGN KEY ("shared_with_group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_stats" ADD CONSTRAINT "habit_status_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("habit_id") ON DELETE cascade ON UPDATE no action;
*/