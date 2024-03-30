import { Button } from '@fms/atoms';
import { FC, ReactElement } from 'react';
import { currencyFormat } from '@fms/utilities';

export type TSelectedMenu = {
  quantity: number;
  loading?: boolean;
  isValid?: boolean;
  handleMinus: () => void;
  handlePlus: () => void;
  price: number;
};

export const CustomOrder: FC<TSelectedMenu> = ({
  loading,
  ...props
}): ReactElement => {
  return loading ? (
    <div className="text-center text-2xl">loading...</div>
  ) : (
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
                    type="button"
                    className={`w-10 h-10 rounded-full text-xl border-2  text-center font-bold flex items-center justify-center border-primary-700 text-primary-700 disabled:border-grey-300 disabled:text-grey-300`}
                    onClick={props.handleMinus}
                    disabled={props.quantity === 1}
                  >
                    -
                  </Button>
                  <p>{props.quantity}</p>
                  <Button
                    type="button"
                    className="w-10 h-10 rounded-full text-xl border-2 border-primary-700 text-center text-primary-700 font-bold flex items-center justify-center"
                    onClick={props.handlePlus}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button disabled={!props.isValid} type="submit">
                Tambah Pesanan - {currencyFormat(props.price * props?.quantity)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
