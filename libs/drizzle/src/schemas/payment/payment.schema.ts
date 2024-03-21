import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { orders } from '../order/order.schema';

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  accountName: text('account_name').notNull(),
  accountNumber: text('account_number').notNull(),
  amount: text('amount').notNull(),
  ...baseSchema,
});

export const paymentRelations = relations(payments, ({ many }) => ({
  order: many(orders),
}));
