import { pgTable, pgEnum, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { unitTypes } from '../unit-type/unit-type.schema';
import { itemLogs } from './item-log.schema';
import { users } from '../me';

export const ingredientUnitEnum = pgEnum('ingredient_unit', ['ml', 'g']);

export const items = pgTable('items', {
  name: text('name').notNull(),
  price: integer('price').notNull(),
  itemAmount: text('item_amount'),
  itemAmountTypeId: uuid('item_amount_type_id')
    .notNull()
    .references(() => unitTypes.id),
  ingredientUnit: ingredientUnitEnum('ingredient_unit'),
  ingredientAmount: text('ingredient_amount'),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  deletedBy: uuid('deleted_by').references(() => users.id),
  ...baseSchema,
});

export const itemRelations = relations(items, ({ one, many }) => ({
  unitType: one(unitTypes, {
    fields: [items.itemAmountTypeId],
    references: [unitTypes.id],
  }),
  itemLog: many(itemLogs),
  createdBy: one(users, {
    fields: [items.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [items.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
  deletedBy: one(users, {
    fields: [items.deletedBy],
    references: [users.id],
    relationName: 'deleted_by',
  }),
}));
