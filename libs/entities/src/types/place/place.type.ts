import { z } from 'zod';
import { baseSchema, TBase, TBaseResponse } from '../common';

export const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
  ...baseSchema.omit({ id: true }).shape,
});

export const placeCreateSchema = z.object({
  name: z.string(),
});

export const placeUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TPlace = z.infer<typeof placeSchema>;
export type TPlaceCreateRequest = z.infer<typeof placeCreateSchema>;
export type TPlaceUpdateRequest = z.infer<typeof placeUpdateSchema>;
export type TPlaceSingleResponse = TBaseResponse<TPlace>;
export type TPlaceResponse = TBaseResponse<TPlace[]>;
