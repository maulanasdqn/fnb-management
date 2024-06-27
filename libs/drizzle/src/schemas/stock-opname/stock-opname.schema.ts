import { baseSchema } from '../base/base.schema';
import { doublePrecision, pgTable, uuid } from 'drizzle-orm/pg-core';
import { unitTypes } from '../unit/unit-type.schema';
import { ingredients } from '../ingredient/ingredient.schema';
import { relations } from 'drizzle-orm';

export const stockOpnames = pgTable('stock_opnames', {
  amount: doublePrecision('amount').notNull(),
  ingredientId: uuid('ingredient_id')
    .notNull()
    .references(() => ingredients.id),
  unitTypeId: uuid('unit_type_id')
    .notNull()
    .references(() => unitTypes.id),
  ...baseSchema,
});

export const stockOpnameRelations = relations(stockOpnames, ({ one }) => ({
  ingredient: one(ingredients, {
    fields: [stockOpnames.ingredientId],
    references: [ingredients.id],
  }),
  unitType: one(unitTypes, {
    fields: [stockOpnames.unitTypeId],
    references: [unitTypes.id],
  }),
}));
