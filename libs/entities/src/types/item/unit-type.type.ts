import { z } from 'zod';
import { TMetaResponse } from '../../types';
import {
  unitTypeCreateSchema,
  unitTypeSchema,
  unitTypeUpdateSchema,
} from '../../validation-schemas';

export type TUnitType = z.infer<typeof unitTypeSchema>;

export type TUnitTypeCreateRequest = z.infer<typeof unitTypeCreateSchema>;

export type TUnitTypeUpdateRequest = z.infer<typeof unitTypeUpdateSchema>;

export type TUnitTypeSingleResponse = TMetaResponse<TUnitType>;
export type TUnitTypeResponse = TMetaResponse<TUnitType[]>;
