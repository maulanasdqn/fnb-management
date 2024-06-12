ALTER TABLE "orders" ADD COLUMN "type" text;--> statement-breakpoint
ALTER TABLE "order_details" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_details" DROP COLUMN IF EXISTS "amount";