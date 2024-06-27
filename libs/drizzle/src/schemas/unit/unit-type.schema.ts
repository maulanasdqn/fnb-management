import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { ingredients } from '../ingredient/ingredient.schema';
import { unitTypeConversions } from './unit-type-conversion.schema';
import { stockOpnames } from '../stock-opname/stock-opname.schema';

export const unitTypes = pgTable('unit_types', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const unitTypeRelations = relations(unitTypes, ({ many }) => ({
  ingredients: many(ingredients),
  stockOpnames: many(stockOpnames),
  fromUnits: many(unitTypeConversions, { relationName: 'from_unit_type' }),
  toUnits: many(unitTypeConversions, { relationName: 'to_unit_type' }),
}));
