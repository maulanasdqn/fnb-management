import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { orders } from '../order/order.schema';

export const customers = pgTable('customers', {
  name: text('name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  ...baseSchema,
});

export const customersRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}));
