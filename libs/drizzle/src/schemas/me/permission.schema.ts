import { pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { rolesToPermissions } from './role.schema';

export const permissions = pgTable('permissions', {
  name: text('name').notNull(),
  key: text('key').unique().notNull(),
  parent: text('parent').notNull(),
  group: text('group').notNull(),
  ...baseSchema,
});

export const permissionRelations = relations(permissions, ({ many }) => ({
  rolesToPermissions: many(rolesToPermissions),
}));
