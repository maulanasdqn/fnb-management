import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { customers } from '../customer/customer.schema';
import { places } from '../place/place.schema';
import { payments } from '../payment/payment.schema';
import { baseSchema } from '../base/base.schema';
import { users } from '../me/user.schema';
import { orderDetails } from './order-detail.schema';

export const orders = pgTable('orders', {
  isPaid: boolean('is_paid').default(false),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id, {
      onDelete: 'set null',
    }),
  placeId: uuid('place_id').references(() => places.id, {
    onDelete: 'set null',
  }),
  amountTotal: integer('amount_total').notNull(),
  paymentId: uuid('payment_id').references(() => payments.id, {
    onDelete: 'set null',
  }),
  invoiceNumber: text('invoice_number').notNull(),
  status: text('status').default('ordered'),
  type: text('type').default('Dine In'),
  servedBy: uuid('served_by').references(() => users.id, {
    onDelete: 'set null',
  }),
  ...baseSchema,
});

export const orderRelations = relations(orders, ({ one, many }) => ({
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
    relationName: 'served_by',
  }),
  details: many(orderDetails),
}));
