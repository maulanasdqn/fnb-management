ALTER TABLE "unit_conversions" RENAME TO "unit_type_conversions";--> statement-breakpoint
ALTER TABLE "unit_type_conversions" DROP CONSTRAINT "unit_conversions_from_unit_id_unit_types_id_fk";
--> statement-breakpoint
ALTER TABLE "unit_type_conversions" DROP CONSTRAINT "unit_conversions_to_unit_id_unit_types_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_type_conversions" ADD CONSTRAINT "unit_type_conversions_from_unit_id_unit_types_id_fk" FOREIGN KEY ("from_unit_id") REFERENCES "public"."unit_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_type_conversions" ADD CONSTRAINT "unit_type_conversions_to_unit_id_unit_types_id_fk" FOREIGN KEY ("to_unit_id") REFERENCES "public"."unit_types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
