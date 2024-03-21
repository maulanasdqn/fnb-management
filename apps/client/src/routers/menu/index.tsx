import { Button } from '@fms/atoms';
import { Icon } from '@iconify/react';
import { FC, ReactElement, useEffect, useRef } from 'react';
import { SelectedMenu } from './modules/selected-menu';
import { trpc } from '@fms/trpc-client';
import { currencyFormat } from '@fms/utilities';

export const MenuPage: FC = (): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const { data } = trpc.product.findMany.useQuery({
    search: inputRef?.current?.value as string,
  });

  console.log(data, inputRef?.current?.value);

  return (
    <section className="w-full min-h-screen relative">
      <div className="flex items-center justify-center w-full h-56 bg-primary-800 p-2">
        <h1 className="text-2xl font-bold text-white">Serasa Erat Kopi</h1>
      </div>
      <div className="flex sticky items-center text-lg px-4 justify-center w-9/12 h-auto py-4 shadow-md rounded-lg -mt-8 bg-white mx-auto mb-3">
        <Icon icon="carbon:search" width="24" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari menu favoritmu..."
          className="w-full border-none outline-none focus:outline-none px-2"
        />
      </div>
      <div className="text-center text-xl font-medium mb-4">
        <h1>Rekomendasi</h1>
      </div>
      <section className="grid grid-cols-2 w-full px-3 gap-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col max-w-sm bg-white rounded-lg gap-y-3"
          >
            <figure className="flex flex-col gap-y-2">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain rounded-lg"
              />
              <figcaption className="text-left font-bold text-base">
                {item.name}
              </figcaption>
              <h2 className="text-left font-bold text-base">
                {currencyFormat(item.priceSelling)}
              </h2>
            </figure>
            <div>
              <Button
                type="button"
                className="w-full bg-white border-primary-800  border rounded-2xl text-primary-800"
              >
                Pesan
              </Button>
            </div>
          </div>
        ))}
      </section>
      <SelectedMenu />
    </section>
  );
};
