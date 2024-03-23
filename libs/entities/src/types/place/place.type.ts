import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TPlace = TBase & {
  name: string;
};

export type TPlaceQueryParams = {
  id?: string;
  search?: string;
};

export type TPlaceCreateRequest = {
  name: string;
};

export type TPlaceUpdateRequest = {
  id?: string;
  name?: string;
};

export type TPlaceSingleResponse = TMetaResponse<TPlace>;
export type TPlaceResponse = TMetaResponse<TPlace[]>;
