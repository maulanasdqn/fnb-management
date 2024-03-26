import { Button } from '@fms/atoms';
import { FC, ReactElement, useState } from 'react';

export type TSelectedMenu = {
  totalPrice?: number;
  quantity?: number;
};

export const CustomOrder: FC<TSelectedMenu> = ({
  totalPrice = 15000,
  ...props
}): ReactElement => {
  const [updateQuantity, setUpdateQuantity] = useState<number>(
    (props.quantity = 1)
  );
  const [updateTotalPrice, setUpdateTotalPrice] = useState<number>(totalPrice);

  const handlerAddQuantity = () => {
    setUpdateQuantity((prev) => prev + 1);
    setUpdateTotalPrice((prev) => prev + totalPrice);
  };

  const handlerMinusQuantity = () => {
    setUpdateQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    setUpdateTotalPrice((prev) => prev - totalPrice);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0 3px 10px rgba(0,0,0,0.2)] p-4">
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full justify-between h-full gap-x-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-full gap-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-grey-900 font-semibold ">
                  Jumlah Pesanan
                </h2>
                <div className="flex items-center gap-x-3 ">
                  <Button
                    className={`w-10 h-10 rounded-full text-xl border-2  text-center font-bold flex items-center justify-center border-primary-700 text-primary-700 disabled:border-grey-300 disabled:text-grey-300`}
                    onClick={handlerMinusQuantity}
                    disabled={updateQuantity === 1}
                  >
                    -
                  </Button>
                  <p>{updateQuantity}</p>
                  <Button
                    className="w-10 h-10 rounded-full text-xl border-2 border-primary-700 text-center text-primary-700 font-bold flex items-center justify-center"
                    onClick={handlerAddQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button>Tambah Pesanan -{updateTotalPrice}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
