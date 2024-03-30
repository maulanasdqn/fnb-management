import { Button } from '@fms/atoms';
import { TProductSingleResponse } from '@fms/entities';
import { FC, ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {cartProductState, totalPriceState, totalQuantityState } from '../../stores';
import { useNavigate } from 'react-router-dom';

export type TSelectedMenu = {
  quantity?: number;
  loading?: boolean;
  data: TProductSingleResponse;
};

export const CustomOrder: FC<TSelectedMenu> = ({
  loading,
  ...props
}): ReactElement => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useRecoilState(totalQuantityState(props.data.id));
  const [updateTotalPrice, setUpdateTotalPrice] = useRecoilState(
    totalPriceState(props.data.priceSelling)
  );
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);


  const handlerAddQuantity = () => {
    setQuantity((prev) => prev + 1);
    setUpdateTotalPrice((prev) => prev + (props.data?.priceSelling ?? 0));
  };

  const handlerMinusQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    setUpdateTotalPrice((prev) => prev - (props.data?.priceSelling ?? 0));
  };

  const doAddToChart = () => {
    const newCartItem = {
      id: props.data?.id,
      name: props.data?.name,
      quantity,
      totalPrice: updateTotalPrice,
    };
    setCartProducts([...cartProducts, newCartItem]);
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  useEffect(() => {
    handlerAddQuantity();
    handlerMinusQuantity();
  }, []);

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
                    className={`w-10 h-10 rounded-full text-xl border-2  text-center font-bold flex items-center justify-center border-primary-700 text-primary-700 disabled:border-grey-300 disabled:text-grey-300`}
                    onClick={handlerMinusQuantity}
                    disabled={quantity === 1}
                  >
                    -
                  </Button>
                  <p >{quantity}</p>
                  <Button
                    className="w-10 h-10 rounded-full text-xl border-2 border-primary-700 text-center text-primary-700 font-bold flex items-center justify-center"
                    onClick={handlerAddQuantity}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button onClick={doAddToChart}>
                Tambah Pesanan -{' '}
                {updateTotalPrice === undefined ? loading : updateTotalPrice}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
