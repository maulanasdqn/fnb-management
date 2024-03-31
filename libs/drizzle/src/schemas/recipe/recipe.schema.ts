import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';

export const recipes = pgTable('recipes', {
  name: text('name').notNull(),
  variants: text('variants').array(),
  ...baseSchema,
});

export const recipeRelations = relations(recipes, ({ many }) => ({
  products: many(products),
}));
