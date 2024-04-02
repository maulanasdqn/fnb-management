import { ControlledFieldText, Modal } from '@fms/organisms';
import { FC, ReactElement, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TSelectedMenu, TSubmitedData } from './modules';
import { currencyFormat, useLocalStorage } from '@fms/utilities';
import { CheckoutCard } from './modules/checkout-card';
import { useSearchParams } from 'react-router-dom';

export const MenuCheckoutPage: FC<{ loading?: boolean }> = ({
  loading,
}): ReactElement => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [getParams] = useSearchParams();

  const [cartData, setCartData] = useLocalStorage<TSubmitedData[]>(
    'order-data',
    []
  );

  const getTotalPrice = (cartData: TSubmitedData[]) => {
    return cartData.reduce((acc, item) => {
      return acc + item.priceSelling * item.quantity;
    }, 0);
  };

  const tax = getTotalPrice(cartData) * 0.1;

  const [updateTotalPrice, setUpdateTotalPrice] = useState<number>(
    getTotalPrice(cartData)
  );

  const handleUpdatePrice = (val: number, index: number) => {
    const newData = [...cartData];
    newData[index].quantity = val;
    setUpdateTotalPrice(getTotalPrice(newData));
    setCartData(newData);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      tableId: getParams.get('tableId') || '',
    },
  });

  const handleOrder = handleSubmit((data) => {
    console.log({
      name: data.name,
      tableId: data.tableId,
      paymentMethod,
      orders: cartData,
    });
  });

  return loading ? (
    <section className="p-4">
      <div className="w-8 h-2 bg-grey-50 rounded-md"></div>
      <div className="flex flex-col py-4 gap-y-4">
        <div className="w-16 h-2 bg-grey-50 rounded-md"></div>
        <div className="w-16 h-2 bg-grey-50 rounded-md"></div>
      </div>
      <div className="w-8 h-2 bg-grey-50 rounded-md"></div>

      <div className="my-4 bg-grey-50 w-full h-[120px] rounded-md"></div>
      <div className="my-4 bg-grey-50 w-full h-[120px] rounded-md"></div>
    </section>
  ) : (
    <form onSubmit={handleOrder}>
      <section className="p-4">
        <h1 className="text-2xl font-bold">Form Pemesan </h1>
        <div className="flex flex-col py-4 gap-y-4">
          <ControlledFieldText
            required
            control={control}
            size="md"
            name="name"
            type="name"
            label="Nama"
            placeholder="Masukan Nama Pemesan"
          />
          <ControlledFieldText
            required
            control={control}
            size="md"
            name="tableId"
            type="table_id"
            label="Nomor Meja"
            placeholder="Masukan Nomor Meja"
          />
        </div>
        <h1 className="text-2xl font-bold">Detail Pesanan </h1>

        {cartData.map((data, index) => {
          return (
            <CheckoutCard
              updatePrice={handleUpdatePrice}
              key={index}
              order={data}
              quantity={data.quantity}
              index={index}
            />
          );
        })}

        <h1 className="text-2xl font-bold">Payment Summary </h1>

        <span className="flex flex-col pt-4 pb-[80px]">
          <div className="flex w-full justify-between">
            <span>Subtotal Pesanan</span>
            <span>{currencyFormat(updateTotalPrice)}</span>
          </div>
          <div className="flex w-full justify-between ">
            <span>PPN 10%</span>
            <span>{currencyFormat(tax)}</span>
          </div>
          <div className="flex w-full justify-between ">
            <span>Total Pembayaran</span>
            <span>{currencyFormat(updateTotalPrice + tax)}</span>
          </div>
          <p className="font-bold pt-4">Metode Pembayaran :</p>
          <div className="flex gap-8 pt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <span className="ml-2">Tunai</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                name="paymentMethod"
                value="non-cash"
                checked={paymentMethod === 'non-cash'}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <span className="ml-2">Non Tunai</span>
            </label>
          </div>
          <p className="text-xs">*Silahkan melakukan pembayaran di kasir</p>
        </span>
      </section>
      <button
        type="submit"
        className="flex fixed bottom-0 w-full h-[60px] bg-success-400 justify-center items-center text-white font-bold text-lg"
      >
        Pesan Sekarang
      </button>
    </form>
  );
};
