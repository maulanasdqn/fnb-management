CREATE TABLE IF NOT EXISTS "product_variants" (
	"product_id" uuid,
	"variant_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_variant_option_id_variant_options_id_fk";
--> statement-breakpoint
ALTER TABLE "variant_options" ALTER COLUMN "ingredient_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "variant_options" ALTER COLUMN "unit_type_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "variant_options" ALTER COLUMN "amount" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN IF EXISTS "variant_option_id";