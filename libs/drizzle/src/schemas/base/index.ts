import { timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const baseSchema = {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }).defaultNow(),
  isDeleted: boolean('is_deleted').default(false),
};
