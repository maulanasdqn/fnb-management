import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { productCategories } from './product-category.schema';
import { users } from '../me/user.schema';
import { orderDetails } from '../order/order-detail.schema';
import { variantOptions } from '../variant/variant-option.schema';
import { recipes } from '../recipe/recipe.schema';

export const products = pgTable('products', {
  name: text('name').notNull(),
  productCategoryId: uuid('product_category_id').references(
    () => productCategories.id,
    { onDelete: 'set null' }
  ),
  recipeId: uuid('recipe_id').references(() => recipes.id, {
    onDelete: 'set null',
  }),
  priceSelling: integer('price_selling').notNull(),
  image: text('image'),
  description: text('description'),
  createdBy: uuid('created_by').references(() => users.id, {
    onDelete: 'set null',
  }),
  updatedBy: uuid('updated_by').references(() => users.id, {
    onDelete: 'set null',
  }),
  ...baseSchema,
});

export const productVariants = pgTable('product_variants', {
  productId: uuid('product_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  variantOptionId: uuid('variant_option_id').references(
    () => variantOptions.id,
    { onDelete: 'cascade' }
  ),
  ...baseSchema,
});

export const productVariantRelations = relations(
  productVariants,
  ({ one }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
    variant: one(variantOptions, {
      fields: [productVariants.variantOptionId],
      references: [variantOptions.id],
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
  recipe: one(recipes, {
    fields: [products.recipeId],
    references: [recipes.id],
  }),
}));
