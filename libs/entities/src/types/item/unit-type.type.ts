import { TMetaResponse } from '../../types';
import { TBase } from '../common';

export type TUnitType = TBase & {
  name: string;
};

export type TUnitTypeQueryParams = {
  id?: string;
  search?: string;
};

export type TUnitTypeCreateRequest = {
  name: string;
};

export type TUnitTypeUpdateRequest = {
  id?: string;
  name?: string;
};

export type TUnitTypeSingleResponse = TMetaResponse<TUnitType>;
export type TUnitTypeResponse = TMetaResponse<TUnitType[]>;
