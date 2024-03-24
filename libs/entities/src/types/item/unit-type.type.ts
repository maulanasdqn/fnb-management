import { z } from 'zod';
import { TBaseResponse } from '../../types';
import {
  unitTypeCreateSchema,
  unitTypeSchema,
  unitTypeUpdateSchema,
} from '../../validation-schemas';

export type TUnitType = z.infer<typeof unitTypeSchema>;

export type TUnitTypeCreateRequest = z.infer<typeof unitTypeCreateSchema>;

export type TUnitTypeUpdateRequest = z.infer<typeof unitTypeUpdateSchema>;

export type TUnitTypeSingleResponse = TBaseResponse<TUnitType | undefined>;
export type TUnitTypeResponse = TBaseResponse<TUnitType[] | undefined>;
