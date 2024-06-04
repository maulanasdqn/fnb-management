import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';

export const payments = pgTable('payments', {
  name: text('name').notNull(),
  accountName: text('account_name').notNull(),
  accountNumber: text('account_number').notNull(),
  amount: text('amount').notNull(),
  ...baseSchema,
});

export const paymentRelations = relations(payments, ({ many }) => ({}));
