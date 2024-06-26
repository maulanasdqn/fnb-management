import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from '../product/product.schema';
import { orders } from './order.schema';
import { baseSchema } from '../base/base.schema';

export const orderDetails = pgTable('order_details', {
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id, { onDelete: 'set null' }),
  quantity: integer('quantity').notNull(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
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
