import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const unitTypeSchema = z.object({
  name: z.string(),
  conversions: z
    .array(
      z.object({
        toUnitType: z.object({
          id: z.string(),
          name: z.string(),
        }),
        conversionFactor: z.number(),
      })
    )
    .optional()
    .nullable(),
  ...baseSchema.shape,
});

export const unitTypeCreateSchema = z.object({
  name: z.string(),
  conversions: z
    .array(
      z.object({
        toUnitTypeId: z.string(),
        conversionFactor: z.number(),
      })
    )
    .optional(),
});

export const unitTypeUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  conversions: z
    .array(
      z.object({
        toUnitTypeId: z.string(),
        conversionFactor: z.number(),
      })
    )
    .optional(),
});

export type TUnitType = z.infer<typeof unitTypeSchema>;
export type TUnitTypeCreateRequest = z.infer<typeof unitTypeCreateSchema>;
export type TUnitTypeUpdateRequest = z.infer<typeof unitTypeUpdateSchema>;
export type TUnitTypeSingleResponse = TBaseResponse<TUnitType>;
export type TUnitTypeResponse = TBaseResponse<Omit<TUnitType, 'conversions'>[]>;
