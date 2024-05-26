ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" DROP COLUMN IF EXISTS "permissions";