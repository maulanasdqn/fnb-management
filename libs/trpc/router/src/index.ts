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
} from '@fms/api-libs';

export const appRouter = router({
  user: userController,
  role: roleController,
  auth: authController,
  item: itemController,
  order: orderController,
  product: productController,
  purchase: purchaseController,
  recipe: recipeController,
});
export type appRouter = typeof appRouter;
