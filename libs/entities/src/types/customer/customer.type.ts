import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const customerSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  ...baseSchema.shape,
});

export const customerCreateSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
});

export const customerUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const customerQuerySchema = z.object({
  id: z.string().optional(),
  search: z.string().optional(),
});

export type TCustomer = z.infer<typeof customerSchema>;
export type TCustomerQuery = z.infer<typeof customerQuerySchema>;
export type TCustomerCreateRequest = z.infer<typeof customerCreateSchema>;
export type TCustomerUpdateRequest = z.infer<typeof customerUpdateSchema>;
export type TCustomerSingleResponse = TBaseResponse<TCustomer>;
export type TCustomerResponse = TBaseResponse<TCustomer[]>;
