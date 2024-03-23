import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';

export const orderDetails = pgTable('order_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id')
    .notNull()
    .references(() => products.id),
  qty: integer('qty').notNull(),
  price: integer('price').notNull(),
  amount: integer('amount').notNull(),

  ...baseSchema,
});

export const orderDetailRelations = relations(orderDetails, ({ one }) => ({
  products: one(products, {
    fields: [orderDetails.productId],
    references: [products.id],
  }),
}));
