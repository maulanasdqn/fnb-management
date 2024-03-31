import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { variants } from './variant.schema';
import { items } from '../item';

export const variantOptions = pgTable('variant_options', {
  name: text('name').notNull(),
  amount: text('amount').notNull(),
  itemId: uuid('item_id')
    .notNull()
    .references(() => items.id),
  variantId: uuid('variant_id')
    .notNull()
    .references(() => variants.id),
  ...baseSchema,
});

export const variantOptionRelations = relations(variantOptions, ({ one }) => ({
  variant: one(variants, {
    fields: [variantOptions.variantId],
    references: [variants.id],
  }),
  item: one(items, {
    fields: [variantOptions.itemId],
    references: [items.id],
  }),
}));
