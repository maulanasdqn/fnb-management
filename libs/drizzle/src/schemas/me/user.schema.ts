import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { roles } from './role.schema';

export const users = pgTable('users', {
  fullname: text('fullname').notNull(),
  username: text('username').unique().notNull(),
  avatar: text('avatar'),
  password: text('password').notNull(),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roles.id),
  createdBy: uuid('created_by'),
  updatedBy: uuid('updated_by'),
  deletedBy: uuid('deleted_by'),
  ...baseSchema,
});

export const userRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  createdBy: one(users, {
    fields: [users.createdBy],
    references: [users.id],
    relationName: 'created_by',
  }),
  updatedBy: one(users, {
    fields: [users.updatedBy],
    references: [users.id],
    relationName: 'updated_by',
  }),
  deletedBy: one(users, {
    fields: [users.deletedBy],
    references: [users.id],
    relationName: 'deleted_by',
  }),
}));
