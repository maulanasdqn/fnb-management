import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { recipes } from './recipe.schema';
import { items } from '../item/item.schema';

export const recipeDetails = pgTable('recipe_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  recipeId: uuid('recipe_id')
    .notNull()
    .references(() => recipes.id),
  itemId: uuid('item_id')
    .notNull()
    .references(() => items.id),
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
