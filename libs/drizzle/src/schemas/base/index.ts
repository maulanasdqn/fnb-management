import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const baseSchema = {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
};
