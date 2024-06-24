ALTER TABLE "unit_type_conversions" RENAME COLUMN "from_unit_id" TO "from_unit_type_id";--> statement-breakpoint
ALTER TABLE "unit_type_conversions" RENAME COLUMN "to_unit_id" TO "to_unit_type_id";--> statement-breakpoint
ALTER TABLE "unit_type_conversions" DROP CONSTRAINT "unit_type_conversions_from_unit_id_unit_types_id_fk";
--> statement-breakpoint
ALTER TABLE "unit_type_conversions" DROP CONSTRAINT "unit_type_conversions_to_unit_id_unit_types_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_type_conversions" ADD CONSTRAINT "unit_type_conversions_from_unit_type_id_unit_types_id_fk" FOREIGN KEY ("from_unit_type_id") REFERENCES "public"."unit_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_type_conversions" ADD CONSTRAINT "unit_type_conversions_to_unit_type_id_unit_types_id_fk" FOREIGN KEY ("to_unit_type_id") REFERENCES "public"."unit_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
