import { ZodTypeAny, z } from 'zod';

export const baseSchema = z.object({
  id: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
});

export const queryParamsSchema = z
  .object({
    id: z.string().optional(),
    search: z.string().optional(),
  })
  .optional();

export const metaResponseSchema = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
  totalPage: z.number().optional(),
});

export const dataResponseSchema = <T extends ZodTypeAny>(data: T) =>
  z.object({
    message: z.string().optional(),
    data: z.array(data).optional(),
    meta: metaResponseSchema.optional(),
  });
