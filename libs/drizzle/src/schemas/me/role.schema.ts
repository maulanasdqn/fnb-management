import { users } from './user.schema';
import { pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base';
import { permissions } from './permission.schema';

export const roles = pgTable('roles', {
  name: text('name').notNull(),
  permissions: text('permissions').array(),
  ...baseSchema,
});

export const roleRelations = relations(roles, ({ many }) => ({
  users: many(users),
  rolesToPermissions: many(rolesToPermissions),
}));

export const rolesToPermissions = pgTable(
  'roles_to_permissions',
  {
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id),
    permissionId: uuid('permission_id')
      .notNull()
      .references(() => permissions.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
  })
);

export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ many }) => ({
    role: many(roles),
    permission: many(permissions),
  })
);
