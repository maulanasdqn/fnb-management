import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { orders } from '../order/order.schema';

export const customers = pgTable('customers', {
  name: text('name').notNull(),
  phoneNumber: text('phone_number'),
  ...baseSchema,
});

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}));
