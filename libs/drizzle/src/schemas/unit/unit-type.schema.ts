import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { ingredients } from '../ingredient/ingredient.schema';
import { unitConversions } from './unit-conversion.schema';

export const unitTypes = pgTable('unit_types', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const unitTypeRelations = relations(unitTypes, ({ many }) => ({
  ingredients: many(ingredients),
  fromUnits: many(unitConversions, { relationName: 'from_unit' }),
  toUnits: many(unitConversions, { relationName: 'to_unit' }),
}));
