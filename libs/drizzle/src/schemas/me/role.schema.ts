import { users } from './user.schema';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';

export const roles = pgTable('roles', {
  name: text('name').notNull(),
  permissions: text('permissions').array(),
  ...baseSchema,
});

export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));
