import { pgTable, text, integer, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { purchases } from '../purchase/purchase.schema';
import { users } from '../me';

export const suppliers = pgTable('suppliers', {
  fullname: text('fullname').notNull(),
  address: integer('address').notNull(),
  phoneNumber: integer('phone_number').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  deletedBy: uuid('deleted_by').references(() => users.id),
  ...baseSchema,
});

export const supplierRelations = relations(suppliers, ({ many, one }) => ({
  purchase: many(purchases),
  createdBy: one(users, {
    fields: [suppliers.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [suppliers.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
  deletedBy: one(users, {
    fields: [suppliers.deletedBy],
    references: [users.id],
    relationName: 'deleted_by',
  }),
}));
