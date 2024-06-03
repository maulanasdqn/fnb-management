import { router } from '@fms/trpc-server';
import {
  roleController,
  userController,
  authController,
  itemController,
  orderController,
  productController,
  purchaseController,
  recipeController,
  unitTypeController,
  permissionController,
  productCategoryController,
} from '@fms/api-libs';

export const appRouter = router({
  user: userController,
  role: roleController,
  permission: permissionController,
  auth: authController,
  item: itemController,
  order: orderController,
  product: productController,
  productCategory: productCategoryController,
  purchase: purchaseController,
  recipe: recipeController,
  unitType: unitTypeController,
});
export type appRouter = typeof appRouter;
