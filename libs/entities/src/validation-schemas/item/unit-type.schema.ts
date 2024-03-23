import { z } from 'zod';
import { baseSchema } from '../common';

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

export const unitTypeResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
