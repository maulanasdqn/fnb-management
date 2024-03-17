import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { purchases } from './purchase.schema';
import { items } from '../item/item.schema';

export const purchaseDetails = pgTable('purchase_details', {
  id: uuid('id').defaultRandom().primaryKey(),
  purchaseId: text('purchase_id').notNull(),
  itemId: text('item_id').notNull(),
  qty: text('qty').notNull(),
  price: text('price').notNull(),
  amount: text('amount').notNull(),

  ...baseSchema,
});

export const purchaseDetailRelations = relations(
  purchaseDetails,
  ({ one }) => ({
    purchase: one(purchases, {
      fields: [purchaseDetails.purchaseId],
      references: [purchases.id],
    }),

    item: one(items, {
      fields: [purchaseDetails.itemId],
      references: [items.id],
    }),
  })
);
