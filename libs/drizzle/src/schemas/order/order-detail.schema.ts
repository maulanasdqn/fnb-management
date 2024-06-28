import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from '../product/product.schema';
import { orders } from './order.schema';
import { baseSchema } from '../base/base.schema';
import { variantOptions } from '../variant/variant-option.schema';

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

export const orderVariantOptions = pgTable('order_variant_options', {
  orderDetailId: uuid('order_detail_id')
    .notNull()
    .references(() => orderDetails.id, { onDelete: 'cascade' }),
  variantOptionId: uuid('variant_option_id')
    .notNull()
    .references(() => variantOptions.id, { onDelete: 'set null' }),
  ...baseSchema,
});

export const orderDetailVariantOptionRelations = relations(
  orderVariantOptions,
  ({ one }) => ({
    orderDetail: one(orderDetails, {
      fields: [orderVariantOptions.orderDetailId],
      references: [orderDetails.id],
    }),
    variantOption: one(variantOptions, {
      fields: [orderVariantOptions.variantOptionId],
      references: [variantOptions.id],
    }),
  })
);

export const orderDetailRelations = relations(
  orderDetails,
  ({ one, many }) => ({
    orderVariantOptions: many(orderVariantOptions),
    product: one(products, {
      fields: [orderDetails.productId],
      references: [products.id],
    }),
    order: one(orders, {
      fields: [orderDetails.orderId],
      references: [orders.id],
    }),
  })
);
