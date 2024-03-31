import { pgTable, pgEnum, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { unitTypes } from '../unit-type/unit-type.schema';
import { itemLogs } from './item-log.schema';
import { suppliers } from '../supplier';

export const ingredientUnitEnum = pgEnum('ingredient_unit', ['ml', 'g']);

export const items = pgTable('items', {
  name: text('name').notNull(),
  price: integer('price').notNull(),
  itemAmount: text('item_amount'),
  supplierId: uuid('supplier_id')
    .notNull()
    .references(() => suppliers.id),
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
  itemLogs: many(itemLogs),
  supplier: one(suppliers, {
    fields: [items.supplierId],
    references: [suppliers.id],
  }),
}));
