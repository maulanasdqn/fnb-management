import { Button } from '@fms/atoms';
import { TProductSingleResponse } from '@fms/entities';
import { currencyFormat } from '@fms/utilities';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const ProductCard: FC<{
  item?: TProductSingleResponse;
  loading?: boolean;
}> = ({ item, loading }): ReactElement => {
  return loading ? (
    <div
      key={item?.id}
      className="flex flex-col max-w-sm bg-white p-3 shadow-md rounded-lg gap-y-3"
    >
      <figure className="flex flex-col gap-y-2 animate-pulse">
        <div className="object-cover bg-cover w-[200px] h-[200px] rounded-lg border border-grey-100 bg-grey-100 animate-pulse shadow-sm" />
        <div className="bg-grey-100 animate-pulse rounded-sm h-[18px]"></div>
        <div className="bg-grey-100 animate-pulse rounded-sm h-[18px] w-1/2"></div>
      </figure>
      <div>
        <div className="w-full bg-grey-100 animate-pulse rounded-2xl h-[30px]"></div>
      </div>
    </div>
  ) : (
    <Link
      to={`${item?.id}/detail`}
      key={item?.id}
      className="flex flex-col max-w-sm bg-white p-3 shadow-md rounded-lg gap-y-3"
    >
      <figure className="flex flex-col gap-y-2">
        <img
          src={item?.image || '/no-photo.jpg'}
          alt={item?.name}
          width={200}
          height={200}
          className="object-cover bg-cover w-[200px] h-[200px] rounded-lg border border-grey-100 shadow-sm"
        />
        <figcaption className="text-left font-bold text-base">
          {item?.name}
        </figcaption>
        <h2 className="text-left font-bold text-base">
          {currencyFormat(item?.priceSelling as number)}
        </h2>
      </figure>
      <div>
        <Button
          type="button"
          className="w-full bg-white border-primary-800 border rounded-2xl text-primary-800 text-lg font-semibold hover:bg-primary-800 hover:text-white"
        >
          Pesan
        </Button>
      </div>
    </Link>
  );
};
