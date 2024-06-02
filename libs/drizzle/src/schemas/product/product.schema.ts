import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { productCategories } from './product-category.schema';
import { users } from '../me/user.schema';
import { variantOptions } from '../variant/variant-option.schema';
import { orderDetails } from '../order/order-detail.schema';

export const products = pgTable('products', {
  name: text('name').notNull(),
  productCategoryId: uuid('product_category_id').references(
    () => productCategories.id
  ),
  price: integer('price').notNull(),
  priceSelling: integer('price_selling').notNull(),
  image: text('image'),
  description: text('description'),
  variantOptionId: uuid('variant_option_id').references(
    () => variantOptions.id
  ),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  ...baseSchema,
});

export const productRelations = relations(products, ({ one, many }) => ({
  productCategory: one(productCategories, {
    fields: [products.productCategoryId],
    references: [productCategories.id],
  }),
  orderDetail: many(orderDetails),
  createdBy: one(users, {
    fields: [products.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [products.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
}));
