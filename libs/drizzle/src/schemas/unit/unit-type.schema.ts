import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { ingredients } from '../ingredient/ingredient.schema';

export const unitTypes = pgTable('unit_types', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const unitTypeRelations = relations(unitTypes, ({ many }) => ({
  ingredients: many(ingredients),
}));
