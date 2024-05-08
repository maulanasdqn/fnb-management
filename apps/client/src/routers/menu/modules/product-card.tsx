import { Button } from '@fms/atoms';
import { TProductSingleResponse } from '@fms/entities';
import { currencyFormat } from '@fms/utilities';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const ProductCard: FC<{
  item?: TProductSingleResponse['data'];
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
    <Link to={`${item?.id}/detail`} className="flex flex-col h-full shadow-md rounded">
    <img
      src={item?.image || '/no-photo.jpg'}
      alt={item?.name}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <div className="flex flex-col flex-grow">
      <h3 className="text-gray-900 font-semibold text-lg mb-2">
        {item?.name}
      </h3>
      <p className="text-gray-900 font-bold text-lg">
        {currencyFormat(item?.priceSelling as number)}
      </p>
    </div>
    <Button
      type="button"
      className="mt-2 bg-primary-800 text-white rounded-lg py-2"
    >
      Pesan
    </Button>
  </Link>
  );
};
