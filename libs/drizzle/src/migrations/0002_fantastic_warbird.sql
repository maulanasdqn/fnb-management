ALTER TABLE "customers" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "item_logs" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_details" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "places" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product_categories" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "purchase_details" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "purchases" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "recipe_details" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "suppliers" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "unit_types" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "item_logs" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "item_logs" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "order_details" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "order_details" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "product_categories" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "product_categories" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "purchase_details" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "purchase_details" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "purchases" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "recipe_details" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "recipe_details" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "recipes" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "suppliers" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "unit_types" ADD COLUMN "deleted_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "unit_types" ADD COLUMN "is_deleted" boolean DEFAULT false;