import { FC, ReactElement, Suspense, useEffect, useState } from 'react';
import { trpc } from '@fms/trpc-client';
import { useParams } from 'react-router-dom';
import { lazily } from 'react-lazily';
import { TProductSingleResponse } from '@fms/entities';

const { ProductDetail } = lazily(() => import('./modules'));

export const MenuDetailPage: FC = (): ReactElement => {
  const { id } = useParams() as { id: string };
  const { data, isLoading } = trpc.product.findOne.useQuery({ id });

  return (
    <Suspense fallback={<ProductDetail loading={isLoading} />}>
      <ProductDetail data={data?.data as TProductSingleResponse['data']} loading={isLoading} />
    </Suspense>
  );
};
