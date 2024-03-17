import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { items } from './item.schema';

export const itemLogs = pgTable('item_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  qtyBefore: text('qty_before').notNull(),
  qtyCurrent: text('qty_current').notNull(),
  qtyAfter: text('qty_after').notNull(),
  itemId: uuid('item_id')
    .notNull()
    .references(() => items.id),
  ...baseSchema,
});

export const itemLogRelations = relations(itemLogs, ({ one }) => ({
  item: one(items, {
    fields: [itemLogs.itemId],
    references: [items.id],
  }),
}));
