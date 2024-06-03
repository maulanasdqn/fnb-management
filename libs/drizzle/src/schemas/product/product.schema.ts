import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { productCategories } from './product-category.schema';
import { users } from '../me/user.schema';
import { variantOptions } from '../variant/variant-option.schema';
import { orderDetails } from '../order/order-detail.schema';
import { ingredients } from '../ingredient/ingredient.schema';
import { unitTypes } from '../unit/unit-type.schema';

export const products = pgTable('products', {
  name: text('name').notNull(),
  productCategoryId: uuid('product_category_id').references(
    () => productCategories.id
  ),
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

export const productIngredients = pgTable('product_ingredients', {
  productId: uuid('product_id').references(() => products.id),
  ingredientId: uuid('ingredient_id').references(() => ingredients.id),
  unitTypeId: uuid('unit_type_id').references(() => unitTypes.id),
  amount: integer('amount').notNull(),
  ...baseSchema,
});

export const productIngredientRelations = relations(
  productIngredients,
  ({ one }) => ({
    product: one(products, {
      fields: [productIngredients.productId],
      references: [products.id],
    }),
    ingredient: one(ingredients, {
      fields: [productIngredients.ingredientId],
      references: [ingredients.id],
    }),
    unitType: one(unitTypes, {
      fields: [productIngredients.unitTypeId],
      references: [unitTypes.id],
    }),
  })
);

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
  productIngredients: many(productIngredients),
}));
