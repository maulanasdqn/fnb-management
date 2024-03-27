import { FC, ReactElement, Suspense } from 'react';
import { trpc } from '@fms/trpc-client';
import { useParams } from 'react-router-dom';
import { lazily } from 'react-lazily';

const { ProductDetail, CustomOrder } = lazily(() => import('./modules'));

export const MenuDetailPage: FC = (): ReactElement => {
  const { id } = useParams();
  const { data, isLoading } = trpc.product.findOne.useQuery({ id });

  return (
    <Suspense fallback={<ProductDetail loading />}>
      <ProductDetail data={data} loading={isLoading} />
      <CustomOrder />
    </Suspense>
  );
};
