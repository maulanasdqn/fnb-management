import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { ingredients } from '../ingredient/ingredient.schema';
import { unitTypes } from '../unit/unit-type.schema';

export const recipes = pgTable('recipes', {
  name: text('name').notNull(),
  description: text('description'),
  ...baseSchema,
});

export const recipeIngredients = pgTable('recipe_ingredients', {
  recipeId: uuid('recipe_id')
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  ingredientId: uuid('ingredient_id')
    .notNull()
    .references(() => ingredients.id, { onDelete: 'set null' }),
  unitTypeId: uuid('unit_type_id')
    .notNull()
    .references(() => unitTypes.id, { onDelete: 'set null' }),
  amount: integer('amount').notNull(),
  ...baseSchema,
});

export const recipeRelations = relations(recipes, ({ many }) => ({
  recipeIngredients: many(recipeIngredients),
}));

export const recipeIngredientRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.id],
    }),
    unitType: one(unitTypes, {
      fields: [recipeIngredients.unitTypeId],
      references: [unitTypes.id],
    }),
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
  })
);
