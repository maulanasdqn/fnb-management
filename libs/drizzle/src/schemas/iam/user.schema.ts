import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { roles } from './role.schema';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullname: text('fullname').notNull(),
  username: text('username').unique().notNull(),
  avatar: text('avatar'),
  password: text('password'),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roles.id),
  ...baseSchema,
});

export const userRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));
