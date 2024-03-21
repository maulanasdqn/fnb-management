import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { productCategories } from './product-category.schema';
import { recipes } from '../recipe/recipe.schema';
import { orderDetails } from '../order/order-detail.index';

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  productCategoryId: uuid('product_category_id')
    .notNull()
    .references(() => productCategories.id),
  price: integer('price').notNull(),
  priceSelling: integer('price_selling').notNull(),
  image: text('image'),
  description: text('description'),
  recipeId: uuid('recipe_id')
    .notNull()
    .references(() => recipes.id),
  ...baseSchema,
});

export const productRelations = relations(products, ({ one, many }) => ({
  productCategory: one(productCategories, {
    fields: [products.productCategoryId],
    references: [productCategories.id],
  }),

  recipe: one(recipes, {
    fields: [products.recipeId],
    references: [recipes.id],
  }),
  orderDetail: many(orderDetails),
}));
