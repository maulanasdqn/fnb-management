ALTER TABLE "order_details" ALTER COLUMN "qty" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "order_details" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "order_details" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "amount_total" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" text NOT NULL;