import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';
import { orders } from './order.schema';

export const orderDetails = pgTable('order_details', {
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  amount: integer('amount').notNull(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id),
  ...baseSchema,
});

export const orderDetailRelations = relations(orderDetails, ({ one }) => ({
  products: one(products, {
    fields: [orderDetails.productId],
    references: [products.id],
  }),
  order: one(orders, {
    fields: [orderDetails.orderId],
    references: [orders.id],
  }),
}));
