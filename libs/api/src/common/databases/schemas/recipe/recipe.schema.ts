import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';

export const recipes = pgTable('recipes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  variants: text('variants').array(),
  ...baseSchema,
});

export const recipeRelations = relations(recipes, ({ many }) => ({
  product: many(products),
}));
