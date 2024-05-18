import { Pool } from 'pg';
import * as schema from '../schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
const {
  PERMISSION_CUSTOMER,
  PERMISSION_DASHBOARD_TRANSACTION,
  PERMISSION_INGREDIENTS,
  PERMISSION_ITEM,
  PERMISSION_ORDER,
  PERMISSION_PAYMENT,
  PERMISSION_PLACE,
  PERMISSION_PRODUCT,
  PERMISSION_PURCHASE,
  PERMISSION_RECIPE,
  PERMISSION_ROLE,
  PERMISSION_SUPPLIER,
  PERMISSION_TRANSACTION,
  PERMISSION_UNIT_TYPE,
  PERMISSION_USER,
  PermissionGroupEnum,
  PermissionModuleEnum,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('../../../entities/src/index');

import { config } from 'dotenv';
config();
const dbUrl = process.env['DATABASE_URL'] as string;
const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

const db = drizzle(dbQueryClient, {
  schema,
});

export const seedPermission = async () => {
  const permissionExist = await db
    .select({ id: schema.permissions.id })
    .from(schema.permissions);

  if (permissionExist.length > 0) {
    return;
  }

  const permissionUser = createPermissionsList(
    Object.values(PERMISSION_USER),
    PermissionModuleEnum.User,
    PermissionGroupEnum.UserManagement
  );

  const permissionRole = createPermissionsList(
    Object.values(PERMISSION_ROLE),
    PermissionModuleEnum.Role,
    PermissionGroupEnum.UserManagement
  );

  const permissionOrder = createPermissionsList(
    Object.values(PERMISSION_ORDER),
    PermissionModuleEnum.Order,
    PermissionGroupEnum.Order
  );

  const permissionSupplier = createPermissionsList(
    Object.values(PERMISSION_SUPPLIER),
    PermissionModuleEnum.Supplier,
    PermissionGroupEnum.MasterData
  );

  const permissionPlace = createPermissionsList(
    Object.values(PERMISSION_PLACE),
    PermissionModuleEnum.Place,
    PermissionGroupEnum.MasterData
  );

  const permissionProduct = createPermissionsList(
    Object.values(PERMISSION_PRODUCT),
    PermissionModuleEnum.Product,
    PermissionGroupEnum.MasterData
  );

  const permissionItem = createPermissionsList(
    Object.values(PERMISSION_ITEM),
    PermissionModuleEnum.Item,
    PermissionGroupEnum.MasterData
  );

  const permissionRecipe = createPermissionsList(
    Object.values(PERMISSION_RECIPE),
    PermissionModuleEnum.Recipe,
    PermissionGroupEnum.MasterData
  );

  const permissionIngredient = createPermissionsList(
    Object.values(PERMISSION_INGREDIENTS),
    PermissionModuleEnum.Ingredient,
    PermissionGroupEnum.MasterData
  );

  const permissionPurchase = createPermissionsList(
    Object.values(PERMISSION_PURCHASE),
    PermissionModuleEnum.Purchase,
    PermissionGroupEnum.MasterData
  );

  const permissionPayment = createPermissionsList(
    Object.values(PERMISSION_PAYMENT),
    PermissionModuleEnum.Payment,
    PermissionGroupEnum.MasterData
  );

  const permissionCustomer = createPermissionsList(
    Object.values(PERMISSION_CUSTOMER),
    PermissionModuleEnum.Customer,
    PermissionGroupEnum.MasterData
  );

  const permissionUnitType = createPermissionsList(
    Object.values(PERMISSION_UNIT_TYPE),
    PermissionModuleEnum.UnitType,
    PermissionGroupEnum.MasterData
  );

  const permissionDashboardTransaction = createPermissionsList(
    Object.values(PERMISSION_DASHBOARD_TRANSACTION),
    PermissionModuleEnum.DashboardTransaction,
    PermissionGroupEnum.TransactionReport
  );

  const permissionTransaction = createPermissionsList(
    Object.values(PERMISSION_TRANSACTION),
    PermissionModuleEnum.Transaction,
    PermissionGroupEnum.TransactionReport
  );

  console.log('Seeding permissions... 🚀');
  await db
    .insert(schema.permissions)
    .values([
      ...permissionUser,
      ...permissionRole,
      ...permissionOrder,
      ...permissionSupplier,
      ...permissionPlace,
      ...permissionProduct,
      ...permissionItem,
      ...permissionRecipe,
      ...permissionIngredient,
      ...permissionPurchase,
      ...permissionPayment,
      ...permissionCustomer,
      ...permissionUnitType,
      ...permissionDashboardTransaction,
      ...permissionTransaction,
    ]);
  console.log('Seeding permissions! 🎊');
};

export const createPermissionsList = (
  permissionKeys: string[],
  parent: string,
  group: string
) => {
  const permissions = [];
  for (let i = 0; i < permissionKeys.length; i++) {
    permissions.push({
      name: permissionKeys[i].split('-').join(' ').toUpperCase(),
      key: permissionKeys[i],
      parent,
      group,
    });
  }
  return permissions;
};
