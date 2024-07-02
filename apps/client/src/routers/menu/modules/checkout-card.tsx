import { Button } from '@fms/atoms';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TSubmitedData } from './product-detail';
import { currencyFormat } from '@fms/utilities';

type TCheckoutCard = {
  index: number;
  quantity: number;
  order: TSubmitedData;
  updatePrice: (val: number, index: number) => void;
};

export const CheckoutCard: FC<TCheckoutCard> = (props): ReactElement => {
  const [qty, setQty] = useState(props?.quantity);

  const handleMinusQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handlePlusQuantity = () => {
    setQty(qty + 1);
  };

  useEffect(() => {
    props.updatePrice(qty, props?.index);
  }, [qty]);

  return (
    <div className="flex justify-between border border-slate rounded-md w-full h-auto p-2 my-4">
      <div className="flex flex-col">
        <h1 className="font-bold text-lg">{props?.order?.name}</h1>
        <div className="text-xs">
          <p className="font-bold">
            Size :{' '}
            <span className="font-normal">
              {props?.order?.variant?.variant.name}
            </span>
          </p>
          <p className="font-bold">
            Ice Level :{' '}
            <span className="font-normal">
              {props?.order?.variant?.iceLevel.name}
            </span>
          </p>
          <p className="font-bold">
            Sugar level :{' '}
            <span className="font-normal">
              {props?.order?.variant?.sugarLevel.name}
            </span>
          </p>
          <p className="font-bold">
            Pilihan Toping :{' '}
            <span className="font-normal">
              {props?.order.variant?.topping?.map((data) => data.name).join(', ')}
            </span>
          </p>
        </div>
        <Link to={`/${props?.order?.id}/detail?indexDetail=${props?.index}`}>
          <div className="flex w-[100px]  border justify-center items-center text-sm mt-4 text-success-400 font-bold rounded-md border-success-200 ">
            Ubah variant
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <img
          src={props?.order?.image || '/no-photo.jpg'}
          alt={props?.order?.name}
          width={100}
          height={100}
        />
        <div className="flex items-center gap-x-3 ">
          <Button
            className={`w-8 h-8 rounded-full text-xl border-2  text-center font-bold flex items-center justify-center border-primary-700 text-primary-700 disabled:border-grey-300 disabled:text-grey-300`}
            onClick={handleMinusQuantity}
            disabled={qty === 1}
          >
            -
          </Button>
          <p>{qty}</p>
          <Button
            className="w-8 h-8 rounded-full text-xl border-2 border-primary-700 text-center text-primary-700 font-bold flex items-center justify-center"
            onClick={handlePlusQuantity}
          >
            +
          </Button>
        </div>
        <p className="text-xs">
          Harga: {currencyFormat(props?.order?.priceSelling as number * qty)}
        </p>
      </div>
    </div>
  );
};
