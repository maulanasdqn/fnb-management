import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { items } from '../item/item.schema';

export const unitTypes = pgTable('unit_types', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('fullname').notNull(),
  ...baseSchema,
});

export const unitTypeRelations = relations(unitTypes, ({ many }) => ({
  item: many(items),
}));
