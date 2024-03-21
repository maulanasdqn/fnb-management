import { pgTable, pgEnum, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { unitTypes } from '../unit-type/unit-type.schema';
import { itemLogs } from './item-log.schema';

export const ingredientUnitEnum = pgEnum('ingredient_unit', ['ml', 'g']);

export const items = pgTable('items', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  price: integer('price').notNull(),
  itemAmount: text('item_amount'),
  itemAmountTypeId: uuid('item_amount_type_id')
    .notNull()
    .references(() => unitTypes.id),
  ingredientUnit: ingredientUnitEnum('ingredient_unit'),
  ingredientAmount: text('ingredient_amount'),
  ...baseSchema,
});

export const itemRelations = relations(items, ({ one, many }) => ({
  unitType: one(unitTypes, {
    fields: [items.itemAmountTypeId],
    references: [unitTypes.id],
  }),
  itemLog: many(itemLogs),
}));
