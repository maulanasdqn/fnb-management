import { users } from './user.schema';
import { pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { baseSchema } from '../base/base.schema';
import { permissions } from './permission.schema';

export const roles = pgTable('roles', {
  name: text('name').notNull(),
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
      .references(() => roles.id, {
        onDelete: 'cascade',
      }),
    permissionId: uuid('permission_id')
      .notNull()
      .references(() => permissions.id, {
        onDelete: 'cascade',
      }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
  })
);

export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolesToPermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolesToPermissions.permissionId],
      references: [permissions.id],
    }),
  })
);
