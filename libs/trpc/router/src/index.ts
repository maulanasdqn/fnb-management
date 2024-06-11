import { router } from '@fms/trpc-server';
import {
  roleController,
  userController,
  authController,
  orderController,
  productController,
  purchaseController,
  unitTypeController,
  permissionController,
  productCategoryController,
  ingredientController,
} from '@fms/api-libs';

export const appRouter = router({
  user: userController,
  role: roleController,
  permission: permissionController,
  auth: authController,
  order: orderController,
  product: productController,
  productCategory: productCategoryController,
  purchase: purchaseController,
  unitType: unitTypeController,
  ingredient: ingredientController,
});
export type appRouter = typeof appRouter;
