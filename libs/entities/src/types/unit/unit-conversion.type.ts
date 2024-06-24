import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const unitTypeConversionSchema = z.object({
  fromUnitType: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  toUnitType: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  conversionFactor: z.number(),
  ...baseSchema.shape,
});

export const unitTypeConversionCreateSchema = z.object({
  fromUnitTypeId: z.string(),
  toUnitTypeId: z.string(),
  conversionFactor: z.number(),
});

export const unitTypeConversionUpdateSchema = z.object({
  id: z.string(),
  fromUnitTypeId: z.string().optional(),
  toUnitTypeId: z.string().optional(),
  conversionFactor: z.number().optional(),
});

export type TUnitTypeConversion = z.infer<typeof unitTypeConversionSchema>;
export type TUnitTypeConversionCreateRequest = z.infer<
  typeof unitTypeConversionCreateSchema
>;
export type TUnitTypeConversionUpdateRequest = z.infer<
  typeof unitTypeConversionUpdateSchema
>;
export type TUnitTypeConversionSingleResponse =
  TBaseResponse<TUnitTypeConversion>;
export type TUnitTypeConversionResponse = TBaseResponse<TUnitTypeConversion[]>;
