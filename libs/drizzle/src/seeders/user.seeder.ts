/* eslint-disable @typescript-eslint/no-var-requires */
import * as schema from '../schemas';
import { config } from 'dotenv';
const { RoleEnum } = require('../../../entities/src/enums/index');
config();
import * as argon2 from 'argon2';

export const encryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const seedSuperAdmin = async (db: any) => {
  const permissions = await db
    .select({ id: schema.permissions.id })
    .from(schema.permissions);

  const createRoleSuperAdmin = await db
    .insert(schema.roles)
    .values({
      name: RoleEnum.SuperAdmin,
    })
    .returning({ id: schema.roles.id });
  console.log('Seeding roles... 🚀');
  const roles: {
    roleId: string;
    permissionId: string;
  }[] = [];

  for (const permission of permissions) {
    roles.push({
      roleId: createRoleSuperAdmin.id,
      permissionId: permission.id,
    });
  }

  await db.insert(schema.rolesToPermissions).values(roles);
  await db.insert(schema.users).values({
    fullname: 'Super Admin',
    username: 'admin@admin.com',
    roleId: createRoleSuperAdmin.id,
    password: await argon2.hash('admin'),
  });

  console.log('Seeding roles done! 🎊');
};
