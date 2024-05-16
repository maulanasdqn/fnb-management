import { createBrowserRouter } from 'react-router-dom';
import { MenutLayout } from './menu/layout';
import { lazily } from 'react-lazily';
import { Suspense } from 'react';
import { ProductDetail } from './menu/modules/product-detail';
import { CheckoutSuccessPage } from './menu';
import { Spinner } from '@fms/atoms';

const { MenuPage, MenuDetailPage, MenuCheckoutPage } = lazily(
  () => import('./menu')
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MenutLayout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Spinner/>}>
            <MenuPage />
          </Suspense>
        ),
      },
      {
        path: ':id/detail',
        element: (
          <Suspense fallback={<ProductDetail loading />}>
            <MenuDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense>
            <MenuCheckoutPage
              quantity={0}
              handleMinus={function (): void {
                throw new Error('Function not implemented.');
              }}
              handlePlus={function (): void {
                throw new Error('Function not implemented.');
              }}
              price={0}
            />
          </Suspense>
        ),
      },
      {
        path: 'checkout/success',
        element: (
          <Suspense fallback={'spinner'}>
            <CheckoutSuccessPage />
          </Suspense>  
      )
      }
    ],
  },

  {
    path: '*',
    element: <h1>Page not found</h1>,
  },
]);
