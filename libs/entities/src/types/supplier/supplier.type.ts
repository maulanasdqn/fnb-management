import { z } from 'zod';
import { baseSchema, TBase, TBaseResponse } from '../common';

export const supplierSchema = z.object({
  fullname: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  ...baseSchema.shape,
});

export const supplierCreateSchema = z.object({
  fullname: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
});

export const supplierUpdateSchema = z.object({
  id: z.string(),
  fullname: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export type TSupplier = z.infer<typeof supplierSchema>;
export type TSupplierCreateRequest = z.infer<typeof supplierCreateSchema>;
export type TSupplierUpdateRequest = z.infer<typeof supplierUpdateSchema>;
export type TSupplierSingleResponse = TBaseResponse<TSupplier>;
export type TSupplierResponse = TBaseResponse<TSupplier[]>;
