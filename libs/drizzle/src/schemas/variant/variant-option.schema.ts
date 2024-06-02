import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { variants } from './variant.schema';
import { relations } from 'drizzle-orm';
import { products } from '../product/product.schema';
import { ingredients } from '../ingredient/ingredient.schema';
import { unitTypes } from '../unit-type/unit-type.schema';

export const variantOptions = pgTable('variant_options', {
  name: text('name').notNull(),
  ingredientId: uuid('ingredient_id')
    .notNull()
    .references(() => ingredients.id),
  unitTypeId: uuid('unit_type_id')
    .notNull()
    .references(() => unitTypes.id),
  amount: integer('amount').notNull(),
  variantId: uuid('variant_id')
    .notNull()
    .references(() => variants.id),
  ...baseSchema,
});

export const variantOptionRelations = relations(
  variantOptions,
  ({ one, many }) => ({
    variant: one(variants, {
      fields: [variantOptions.variantId],
      references: [variants.id],
    }),
    products: many(products),
  })
);
