CREATE TYPE "public"."task_status" AS ENUM('pendente', 'concluida');--> statement-breakpoint
CREATE TABLE "task_dependencies" (
	"task_id" text NOT NULL,
	"dependency_id" text NOT NULL,
	CONSTRAINT "task_dependencies_task_id_dependency_id_pk" PRIMARY KEY("task_id","dependency_id")
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" "task_status" DEFAULT 'pendente' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "task_dependencies" ADD CONSTRAINT "task_dependencies_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_dependencies" ADD CONSTRAINT "task_dependencies_dependency_id_tasks_id_fk" FOREIGN KEY ("dependency_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;