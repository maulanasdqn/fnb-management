import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { variants } from './variant.schema';
import { relations } from 'drizzle-orm';
import { productVariants } from '../product/product.schema';
import { ingredients } from '../ingredient/ingredient.schema';
import { unitTypes } from '../unit/unit-type.schema';

export const variantOptions = pgTable('variant_options', {
  name: text('name').notNull(),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id, {
    onDelete: 'set null',
  }),
  unitTypeId: uuid('unit_type_id').references(() => unitTypes.id, {
    onDelete: 'set null',
  }),
  amount: integer('amount'),
  price: integer('price'),
  variantId: uuid('variant_id')
    .notNull()
    .references(() => variants.id, { onDelete: 'cascade' }),
  ...baseSchema,
});

export const variantOptionRelations = relations(
  variantOptions,
  ({ one, many }) => ({
    variant: one(variants, {
      fields: [variantOptions.variantId],
      references: [variants.id],
    }),
    unitType: one(unitTypes, {
      fields: [variantOptions.unitTypeId],
      references: [unitTypes.id],
    }),
    ingredient: one(ingredients, {
      fields: [variantOptions.ingredientId],
      references: [ingredients.id],
    }),
    productVariants: many(productVariants),
  })
);
