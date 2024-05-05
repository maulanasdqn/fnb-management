import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { customers } from '../customer/customer.schema';
import { places } from '../place/place.schema';
import { payments } from '../payment/payment.schema';
import { users } from '../me';

export const orders = pgTable('orders', {
  customerId: text('customer_id').notNull(),
  placeId: uuid('place_id').references(() => places.id),
  amountTotal: integer('amount_total').notNull(),
  paymentId: uuid('payment_id')
    .notNull()
    .references(() => payments.id),
  invoiceNumber: text('invoice_number').notNull(),
  status: text('status'),
  servedBy: uuid('served_by').references(() => users.id),
  ...baseSchema,
});

export const orderRelations = relations(orders, ({ one }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),

  place: one(places, {
    fields: [orders.placeId],
    references: [places.id],
  }),

  payment: one(payments, {
    fields: [orders.paymentId],
    references: [payments.id],
  }),
  servedBy: one(users, {
    fields: [orders.servedBy],
    references: [users.id],
    relationName: 'reserved_by',
  }),
}));
