import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base/base.schema';
import { relations } from 'drizzle-orm';
import { ingredients } from '../ingredient/ingredient.schema';
import { purchases } from './purchase.schema';
import { unitTypes } from '../unit/unit-type.schema';

export const purchaseDetails = pgTable('purchase_details', {
  purchaseId: uuid('purchase_id')
    .notNull()
    .references(() => purchases.id, { onDelete: 'cascade' }),
  ingredientId: uuid('ingredient_id')
    .notNull()
    .references(() => ingredients.id, { onDelete: 'set null' }),
  unitTypeId: uuid('unit_type_id')
    .notNull()
    .references(() => unitTypes.id, { onDelete: 'set null' }),
  amount: integer('amount').notNull(),
  price: integer('price').notNull(),
  ...baseSchema,
});

export const purchaseDetailRelations = relations(
  purchaseDetails,
  ({ one }) => ({
    purchase: one(purchases, {
      fields: [purchaseDetails.purchaseId],
      references: [purchases.id],
    }),
    ingredient: one(ingredients, {
      fields: [purchaseDetails.ingredientId],
      references: [ingredients.id],
    }),
    unitType: one(unitTypes, {
      fields: [purchaseDetails.unitTypeId],
      references: [unitTypes.id],
    }),
  })
);
