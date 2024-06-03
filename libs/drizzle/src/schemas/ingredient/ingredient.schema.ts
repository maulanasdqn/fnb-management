import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { unitTypes } from '../unit/unit-type.schema';
import { users } from '../me/user.schema';
import { relations } from 'drizzle-orm';
import { ingredientLogs } from './ingredient-log.schema';
import { productIngredients } from '../product/product.schema';

export const ingredients = pgTable('ingredients', {
  name: text('name').notNull(),
  price: integer('price').notNull(),
  amount: integer('amount').notNull(),
  unitTypeId: uuid('unit_type_id')
    .notNull()
    .references(() => unitTypes.id),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  ...baseSchema,
});

export const ingredientRelations = relations(ingredients, ({ one, many }) => ({
  ingredientLogs: many(ingredientLogs),
  unitType: one(unitTypes, {
    fields: [ingredients.unitTypeId],
    references: [unitTypes.id],
  }),
  createdBy: one(users, {
    fields: [ingredients.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [ingredients.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
  productIngredients: many(productIngredients),
}));
