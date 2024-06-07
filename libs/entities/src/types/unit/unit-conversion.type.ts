import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const unitConversionSchema = z.object({
  fromUnitId: z.string(),
  toUnitId: z.string(),
  conversionFactor: z.number(),
  ...baseSchema.shape,
});

export const unitConversionCreateSchema = z.object({
  fromUnitId: z.string(),
  toUnitId: z.string(),
  conversionFactor: z.number(),
});

export const unitConversionUpdateSchema = z.object({
  id: z.string(),
  fromUnitId: z.string().optional(),
  toUnitId: z.string().optional(),
  conversionFactor: z.number().optional(),
});

export type TUnitConversion = z.infer<typeof unitConversionSchema>;
export type TUnitConversionCreate = z.infer<typeof unitConversionCreateSchema>;
export type TUnitConversionUpdate = z.infer<typeof unitConversionUpdateSchema>;
export type TUnitConversionSingleResponse = TBaseResponse<TUnitConversion>;
export type TUnitConversionResponse = TBaseResponse<TUnitConversion[]>;
