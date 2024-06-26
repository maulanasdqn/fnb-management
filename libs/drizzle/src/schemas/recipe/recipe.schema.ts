import { pgTable, text } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { ingredients } from '../ingredient/ingredient.schema';

export const recipes = pgTable('recipes', {
  name: text('name').notNull(),
  description: text('description'),
  ...baseSchema,
});

export const recipeIngredients = pgTable('recipe_ingredients', {
  recipeId: text('recipe_id')
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  ingredientId: text('ingredient_id')
    .notNull()
    .references(() => ingredients.id, { onDelete: 'set null' }),
  unitTypeId: text('unit_type_id')
    .notNull()
    .references(() => ingredients.unitTypeId, { onDelete: 'set null' }),
  amount: text('amount').notNull(),
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
    unitType: one(ingredients, {
      fields: [recipeIngredients.unitTypeId],
      references: [ingredients.unitTypeId],
    }),
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
  })
);
