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
  paymentController,
  placeController,
  variantController,
  supplierController,
  recipeController,
  stockOpnameController,
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
  payment: paymentController,
  place: placeController,
  variant: variantController,
  supplier: supplierController,
  recipe: recipeController,
  stockOpname: stockOpnameController,
});
export type appRouter = typeof appRouter;
