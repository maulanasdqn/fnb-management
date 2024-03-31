import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { purchases } from '../purchase/purchase.schema';
import { items } from '../item';

export const suppliers = pgTable('suppliers', {
  fullname: text('fullname').notNull(),
  address: integer('address').notNull(),
  phoneNumber: integer('phone_number').notNull(),
  ...baseSchema,
});

export const supplierRelations = relations(suppliers, ({ many }) => ({
  purchases: many(purchases),
  items: many(items),
}));
