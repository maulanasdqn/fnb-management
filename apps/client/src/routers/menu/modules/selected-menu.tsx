import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { currencyFormat } from '@fms/utilities';
import { TSubmitedData } from './product-detail';

export const SelectedMenu: FC<{ data: TSubmitedData[] }> = (
  props
): ReactElement => {


console.log( props?.data?.map((item) => item.priceSelling));

  return props.data.length ? (
    <Link
      to={`checkout`}
      className="fixed bottom-4 flex items-center justify-start h-auto left-4 right-4 w-auto bg-primary z-10 rounded-xl p-4 shadow-md"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full justify-between h-full gap-x-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-fit max-w-1/2">
              <h1 className="text-xl text-white font-medium">{`${
                props?.data?.reduce((a, b) => a + b.quantity, 0) || 0
              } Item`}</h1>
              <p className="text-lg text-white font-normal truncate w-[250px]">
                {props?.data?.map((item) => item.name).join(', ')}
              </p>
            </div>
            <h1 className="text-xl text-white font-medium">
              {currencyFormat(
                props?.data?.reduce((a, b) => a + (b.priceSelling ?? 0) * b.quantity, 0)
              )}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <></>
  );
};
