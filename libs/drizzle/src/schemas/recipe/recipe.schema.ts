import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { products } from '../product/product.schema';
import { users } from '../me';

export const recipes = pgTable('recipes', {
  name: text('name').notNull(),
  variants: text('variants').array(),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  deletedBy: uuid('deleted_by').references(() => users.id),
  ...baseSchema,
});

export const recipeRelations = relations(recipes, ({ many, one }) => ({
  product: many(products),
  createdBy: one(users, {
    fields: [recipes.createdBy],
    references: [users.id],
    relationName: 'recipe_created_by',
  }),
  updatedBy: one(users, {
    fields: [recipes.updatedBy],
    references: [users.id],
    relationName: 'recipe_updated_by',
  }),
  deletedBy: one(users, {
    fields: [recipes.deletedBy],
    references: [users.id],
    relationName: 'recipe_deleted_by',
  }),
}));
