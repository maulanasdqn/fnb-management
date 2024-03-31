import { z } from 'zod';
import { baseSchema } from '../common';

export const unitTypeSchema = z.object({
  name: z.string(),
  ...baseSchema.shape,
});
export const unitTypeCreateSchema = unitTypeSchema.pick({ name: true });

export const unitTypeUpdateSchema = unitTypeSchema.pick({
  id: true,
  name: true,
});
