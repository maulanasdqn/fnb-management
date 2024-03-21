import { timestamp } from 'drizzle-orm/pg-core';

export const baseSchema = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
};
