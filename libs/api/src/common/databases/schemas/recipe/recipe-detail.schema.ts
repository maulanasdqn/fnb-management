import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';
import { recipes } from './recipe.schema';
import { items } from '../item/item.schema';

export const recipeDetails = pgTable('recipe_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipeId: text('recipe_id').notNull(),
  itemId: text('item_id').notNull(),
  amount: text('amount').notNull(),
  ...baseSchema,
});

export const recipeDetailRelations = relations(recipeDetails, ({ one }) => ({
  item: one(items, {
    fields: [recipeDetails.itemId],
    references: [items.id],
  }),

  recipe: one(recipes, {
    fields: [recipeDetails.recipeId],
    references: [recipes.id],
  }),
}));
