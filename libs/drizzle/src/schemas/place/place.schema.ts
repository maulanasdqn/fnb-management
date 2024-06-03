import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';

export const places = pgTable('places', {
  name: text('name').notNull(),
  ...baseSchema,
});

export const placeRelations = relations(places, ({ many, one }) => ({}));
