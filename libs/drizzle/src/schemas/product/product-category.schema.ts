import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { products } from './product.schema';

export const productCategories = pgTable('product_categories', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const productCategorieRelations = relations(
  productCategories,
  ({ many }) => ({
    product: many(products),
  })
);
