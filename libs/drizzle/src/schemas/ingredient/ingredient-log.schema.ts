import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { ingredients } from './ingredient.schema';
import { relations } from 'drizzle-orm';

export const ingredientLogs = pgTable('ingredient-logs', {
  ingredientId: uuid('ingredient_id')
    .notNull()
    .references(() => ingredients.id),
  amountBefore: integer('amount_before').notNull(),
  amountCurrent: integer('amount_current').notNull(),
  amountAfter: integer('amount_after').notNull(),
  ...baseSchema,
});

export const ingredientLogRelations = relations(ingredients, ({ many }) => ({
  ingredients: many(ingredients),
}));
