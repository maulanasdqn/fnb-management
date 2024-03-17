import { authController } from '../../auth';
import { router } from '../../common';
import { roleController } from '../../iam/';
import { userController } from '../../iam/';
import { itemController } from '../../item/';
import { orderController } from '../../order/';
import { productController } from '../../product';
import { purchaseController } from '../../purchase/';
import { recipeController } from '../../recipe/';

export const trpcController = router({
  user: userController,
  role: roleController,
  auth: authController,
  item: itemController,
  order: orderController,
  product: productController,
  purchase: purchaseController,
  recipe: recipeController,
});
export type TrpcController = typeof trpcController;
