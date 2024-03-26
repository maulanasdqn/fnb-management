import { FC, ReactElement, Suspense } from 'react';
import { CustomOrder } from './modules/custom-order';
import { trpc } from '@fms/trpc-client';
import { useParams } from 'react-router-dom';
import { ProductDetail } from './modules/product-detail';


export const MenuDetailPage: FC = (): ReactElement => {
  const { id } = useParams();
  const { data } = trpc.product.findOne.useQuery({ id });

  return (
    <Suspense fallback={<ProductDetail loading/>}>
      {data ? (
        <ProductDetail data={data}/>
      ) : (
        <ProductDetail loading/>
      )}
      <CustomOrder />
    </Suspense>
  );
};