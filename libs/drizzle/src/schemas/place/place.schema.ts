import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { baseSchema } from '../base';
import { relations } from 'drizzle-orm';
import { orders } from '../order/order.schema';
import { users } from '../me';

export const places = pgTable('places', {
  name: text('name').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  deletedBy: uuid('deleted_by').references(() => users.id),
  ...baseSchema,
});

export const placeRelations = relations(places, ({ many, one }) => ({
  order: many(orders),
  createdBy: one(users, {
    fields: [places.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [places.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
  deletedBy: one(users, {
    fields: [places.deletedBy],
    references: [users.id],
    relationName: 'deleted_by',
  }),
}));
