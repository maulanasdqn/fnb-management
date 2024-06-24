ALTER TABLE "purchases" DROP CONSTRAINT "purchases_ingredient_id_ingredients_id_fk";
--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "rejection_note" text;--> statement-breakpoint
ALTER TABLE "purchases" DROP COLUMN IF EXISTS "ingredient_id";