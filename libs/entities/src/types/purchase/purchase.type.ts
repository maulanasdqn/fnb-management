import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';
import { EPurchaseStatus } from '../../enums';

export const purchaseDetailCreateOrUpdateSchema = z.object({
  ingredientId: z.string(),
  unitTypeId: z.string(),
  amount: z.number(),
  price: z.number(),
});

export const purchaseCreateSchema = z.object({
  supplierId: z.string(),
  details: z.array(purchaseDetailCreateOrUpdateSchema),
});

export const purchaseUpdateSchema = z.object({
  id: z.string(),
  supplierId: z.string().optional(),
  details: z.array(purchaseDetailCreateOrUpdateSchema),
});

export const purchaseApprovalSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(EPurchaseStatus),
  rejectionNote: z.string().optional(),
});

export const purchaseDetailSchema = z.object({
  ingredient: z.object({
    id: z.string(),
    name: z.string(),
  }),
  unitType: z.object({
    id: z.string(),
    name: z.string(),
  }),
  price: z.number(),
  amount: z.number(),
});

export const purchaseSchema = z.object({
  supplier: z
    .object({
      id: z.string(),
      fullName: z.string(),
    })
    .nullable(),
  amountTotal: z.number(),
  invoiceNumber: z.string(),
  status: z.string(),
  purchaseDetails: z.array(purchaseDetailSchema),
  ...baseSchema.shape,
});

export type TPurchase = z.infer<typeof purchaseSchema>;
export type TPurchaseCreateRequest = z.infer<typeof purchaseCreateSchema>;
export type TPurchaseUpdateRequest = z.infer<typeof purchaseUpdateSchema>;
export type TPurchaseApprovalRequest = z.infer<typeof purchaseApprovalSchema>;
export type TPurchaseSingleResponse = TBaseResponse<TPurchase>;
export type TPurchaseResponse = TBaseResponse<
  Omit<TPurchase, 'purchaseDetails'>[]
>;
