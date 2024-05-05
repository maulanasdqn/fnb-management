import { ZodTypeAny, z } from 'zod';

export const baseSchema = z.object({
  id: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable(),
  deletedAt: z.coerce.date().optional().nullable(),
  isDeleted: z.boolean().optional().nullable(),
});

export const metaResponseSchema = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
  totalPage: z.number().optional(),
  total: z.number().optional(),
  prevPage: z.number().optional().nullable(),
  nextPage: z.number().optional().nullable(),
});

export const queryParamsSchema = z
  .object({
    id: z.string().optional(),
    search: z.string().optional(),
  })
  .extend(metaResponseSchema.pick({ page: true, perPage: true }).shape)
  .optional();

export const dataResponseSchema = <T extends ZodTypeAny>(data: T) =>
  z.object({
    message: z.string().optional(),
    data: z.array(data).optional(),
    meta: metaResponseSchema.optional(),
  });

export const dataSingleResponseSchema = <T extends ZodTypeAny>(data: T) =>
  z.object({
    message: z.string().optional(),
    data: z.object({ ...(data as object) }).optional(),
  });
