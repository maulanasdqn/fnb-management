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

export const dropdownController = router({
  productCategory: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await productCategoryService.findAllWithSearch(
        input.search
      );
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.name }))
      );
    }),
  recipe: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await recipeService.findAllWithSearch(input.search);
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.name }))
      );
    }),
  ingredient: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await ingredientService.findAllWithSearch(input.search);
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.name }))
      );
    }),
  place: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await placeService.findAllWithSearch(input.search);
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.name }))
      );
    }),
  payment: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await paymentService.findAllWithSearch(input.search);
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.name }))
      );
    }),
  supplier: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await supplierService.findAllWithSearch(input.search);
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.fullName }))
      );
    }),
  variant: procedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input }) => {
      const result = await variantService.findAllWithSearch(input.search);
      return dropdownOptions(
        result.map((val) => ({ id: val.id, name: val.name, data: val.options }))
      );
    }),
});
