import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { purchases } from '../purchase/purchase.schema';

export const suppliers = pgTable('suppliers', {
  fullName: text('full_name').notNull(),
  address: text('address').notNull(),
  phoneNumber: text('phone_number').notNull(),
  ...baseSchema,
});

export const supplierRelations = relations(suppliers, ({ many }) => ({
  purchases: many(purchases),
}));
