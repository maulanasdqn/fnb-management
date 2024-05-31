import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { productCategories } from './product-category.schema';
import { recipes } from '../recipe/recipe.schema';
import { orderDetails } from '../order/order-detail.index';
import { users } from '../me';

export const products = pgTable('products', {
  name: text('name').notNull(),
  productCategoryId: uuid('product_category_id')
    .references(() => productCategories.id),
  price: integer('price').notNull(),
  priceSelling: integer('price_selling').notNull(),
  image: text('image'),
  description: text('description'),
  recipeId: uuid('recipe_id')
    .references(() => recipes.id),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  deletedBy: uuid('deleted_by').references(() => users.id),
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
  deletedBy: one(users, {
    fields: [products.deletedBy],
    references: [users.id],
    relationName: 'deleted_by',
  }),
}));
