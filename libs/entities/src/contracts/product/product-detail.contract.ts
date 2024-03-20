import { TCProductListResponse } from './product.contract';

export type TCProducDetailResponse = TCProductListResponse & {
  variant: string[];
};
