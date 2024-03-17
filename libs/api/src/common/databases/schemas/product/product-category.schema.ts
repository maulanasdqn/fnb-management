import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from './product.schema';

export const productCategories = pgTable('product_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  ...baseSchema,
});

export const productCategorieRelations = relations(
  productCategories,
  ({ many }) => ({
    product: many(products),
  })
);
