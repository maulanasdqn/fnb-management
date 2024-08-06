import { router, procedure } from '@fms/trpc-server';
import { z } from 'zod';
import { dropdownOptions } from '../../common';
import { productCategoryService } from '../../product/services/product-category.service';
import { recipeService } from '../../recipe/services/recipe.service';
import { ingredientService } from '../../ingredient/services/ingredient.service';
import { placeService } from '../../place/services/place.service';
import { paymentService } from '../../payment/services/payment.service';
import { supplierService } from '../../supplier/services/supplier.service';
import { variantService } from '../../variant/services/variant.service';
import { TCCommonObject } from '@fms/entities';
import { findAllRoleWithSearch } from '../../me/services/role.service';
import { unitTypeService } from '../../unit-type/services/unit-type.service';

export const dropdownController = router({
  productCategory: procedure.query(async () => {
    const result = await productCategoryService.findAllWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
  recipe: procedure.query(async () => {
    const result = await recipeService.findAllWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
  ingredient: procedure.query(async () => {
    const result = await ingredientService.findAllWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
  place: procedure.query(async () => {
    const result = await placeService.findAllWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
  payment: procedure.query(async () => {
    const result = await paymentService.findAllWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
  supplier: procedure.query(async () => {
    const result = await supplierService.findAllWithSearch();
    return dropdownOptions(
      result.map((val) => ({ id: val.id, name: val.fullName }))
    );
  }),
  variant: procedure.query(async () => {
    const result = await variantService.findAllWithSearch();
    return dropdownOptions(
      result.map((val) => ({ id: val.id, name: val.name, data: val.options }))
    );
  }),
  role: procedure.query(async () => {
    const result = await findAllRoleWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
  unitType: procedure.query(async () => {
    const result = await unitTypeService.findAllWithSearch();
    return dropdownOptions(result as TCCommonObject[]);
  }),
});
