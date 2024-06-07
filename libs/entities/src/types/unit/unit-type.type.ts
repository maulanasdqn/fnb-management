import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const unitTypeSchema = z.object({
  name: z.string(),
  ...baseSchema.shape,
});

export const unitTypeCreateSchema = z.object({
  name: z.string(),
});

export const unitTypeUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TUnitType = z.infer<typeof unitTypeSchema>;
export type TUnitTypeCreateRequest = z.infer<typeof unitTypeCreateSchema>;
export type TUnitTypeUpdateRequest = z.infer<typeof unitTypeUpdateSchema>;
export type TUnitTypeSingleResponse = TBaseResponse<TUnitType>;
export type TUnitTypeResponse = TBaseResponse<TUnitType[]>;
