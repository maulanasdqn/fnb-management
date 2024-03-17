import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';

export const orderDetails = pgTable('order_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: text('product_id').notNull(),
  qty: text('qty').notNull(),
  price: text('price').notNull(),
  amount: text('amount').notNull(),

  ...baseSchema,
});

export const orderDetailRelations = relations(orderDetails, ({ one }) => ({
  products: one(products, {
    fields: [orderDetails.productId],
    references: [products.id],
  }),
}));
