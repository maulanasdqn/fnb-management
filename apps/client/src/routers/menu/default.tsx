import { Icon } from '@iconify/react';
import { FC, ReactElement, Suspense, useEffect, useRef, useState } from 'react';
import { trpc } from '@fms/trpc-client';
import { useDebounce, useGetLocalStorage } from '@fms/utilities';
import { lazily } from 'react-lazily';
import { TSubmitedData } from './modules';

const { SelectedMenu, ProductCard } = lazily(() => import('./modules'));

export const MenuPage: FC = (): ReactElement => {
  const [cartData] = useGetLocalStorage('order-data');
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string>('');
  const [debounceValue, setDebounceValue] = useState<string>('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useDebounce(() => {
    setDebounceValue(search);
  }, 500);
  
  const { data, isLoading } = trpc.product.findMany.useQuery({
    search: debounceValue,
  });

  return (
    <section className="w-full min-h-screen relative bg-grey-50">
      <div className="w-full h-56 bg-[url(/bg-heading.jpg)] bg-cover bg-no-repeat bg-center object-cover backdrop-blur-lg p-2 bg-blend-overlay bg-grey">
        <div className="flex items-center justify-center backdrop-blur-[2px] w-full h-56 ">
          <h1 className="text-2xl font-bold text-white">Serasa Erat Kopi</h1>
        </div>
      </div>

      <div className="flex sticky items-center text-lg px-4 justify-center w-9/12 h-auto py-4 shadow-md rounded-lg -mt-8 bg-white mx-auto mb-3">
        <Icon icon="carbon:search" width="24" />
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          ref={inputRef}
          type="text"
          placeholder="Cari menu favoritmu..."
          className="w-full border-none outline-none focus:outline-none px-2"
        />
      </div>

      <section className="grid grid-cols-2 w-full px-3 gap-4 mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {data?.data?.map((item) => (
            <ProductCard loading={isLoading} key={item.id} item={item} />
          ))}
        </Suspense>
      </section>
      {(cartData as boolean) && (
        <Suspense fallback={'Spinner'}>
          <SelectedMenu data={(cartData as TSubmitedData[]) || []} />
        </Suspense>
      )}
    </section>
  );
};
