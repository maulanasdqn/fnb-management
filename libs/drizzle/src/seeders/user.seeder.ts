import * as schema from '../schemas';
import { config } from 'dotenv';
import * as argon2 from 'argon2';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RoleEnum } = require('../../../entities/src/enums/index');
config();

export const encryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const seedSuperAdmin = async (db: any) => {
  try {
    console.log('Seeding permissions... 🚀');
    const permissions = await db
      .select({ id: schema.permissions.id })
      .from(schema.permissions);

    console.log('Creating Super Admin role... 🚀');
    const [createRoleSuperAdmin] = await db
      .insert(schema.roles)
      .values({
        name: RoleEnum.SuperAdmin,
      })
      .returning({ id: schema.roles.id });

    const roles = permissions.map((permission: { id: string }) => ({
      roleId: createRoleSuperAdmin.id,
      permissionId: permission.id,
    }));

    console.log('Assigning permissions to Super Admin... 🚀');
    await db.insert(schema.rolesToPermissions).values(roles);

    const hashedPassword = await encryptPassword('admin');

    console.log('Creating Super Admin user... 🚀');
    await db.insert(schema.users).values({
      fullname: 'admin1',
      username: 'admin1@admin.com',
      roleId: createRoleSuperAdmin.id,
      password: hashedPassword,
    });

    console.log('Seeding roles done! 🎊');
  } catch (error) {
    console.error('Error seeding Super Admin:', error);
  }
};
