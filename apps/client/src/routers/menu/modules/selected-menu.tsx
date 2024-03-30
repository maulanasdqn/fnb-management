import { FC, ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { carProductSelectorState } from '../../stores';
import { currencyFormat } from '@fms/utilities';

export const SelectedMenu: FC = (): ReactElement => {
  const cartData = useRecoilValue(carProductSelectorState);

  const totalItems = cartData.length;
  const totalPrice = cartData.reduce((acc, item) => acc + item.totalPrice, 0);
  const listNameofOrder = cartData.map((item) => item.name).join(', ');
 
  return (
    <Link
      to={`checkout`}
      className="fixed bottom-4 flex items-center justify-start h-auto left-4 right-4 w-auto bg-primary z-10 rounded-xl p-4 shadow-md"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full justify-between h-full gap-x-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-fit max-w-1/2">
              <h1 className="text-xl text-white font-medium">{`${totalItems} Item`}</h1>
              <p className="text-lg text-white font-normal truncate w-[250px]">
                {listNameofOrder}
              </p>
            </div>
            <h1 className="text-xl text-white font-medium">{currencyFormat(totalPrice)}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};
