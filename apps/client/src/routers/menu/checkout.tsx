import { ControlledFieldText } from '@fms/organisms';
import { FC, ReactElement, SetStateAction, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@fms/atoms';
import { Link } from 'react-router-dom';
import { TSelectedMenu, TSubmitedData } from './modules';
import { useGetLocalStorage } from '@fms/utilities';
import { CheckoutCard } from './modules/checkout-card';

export const MenuCheckoutPage: FC<TSelectedMenu> = ({
  totalPrice = 15000,
  ...props
}): ReactElement => {
  const { control } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('cash');

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
  const handlePaymentChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPaymentMethod(e.target.value);
  };

  const [cartData] = useGetLocalStorage<TSubmitedData[]>('order-data');

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
            name="table_id"
            type="table_id"
            label="Nomor Meja"
            placeholder="Masukan Nomor Meja"
          />
        </div>
        <h1 className="text-2xl font-bold">Detail Pesanan </h1>

        {cartData.map((data, index) => {
          return (
            <CheckoutCard
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
            <span>Rp.120.000</span>
          </div>
          <div className="flex w-full justify-between ">
            <span>PPN 10%</span>
            <span>Rp.1.200</span>
          </div>
          <div className="flex w-full justify-between ">
            <span>Total Pembayaran</span>
            <span>Rp.121.200</span>
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
                onChange={handlePaymentChange}
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
                onChange={handlePaymentChange}
              />
              <span className="ml-2">Non Tunai</span>
            </label>
          </div>
          <p className="text-xs">*Silahkan melakukan pembayaran di kasir</p>
        </span>
      </section>
      <footer className="flex fixed bottom-0 w-full h-[60px] bg-success-400 justify-center items-center text-white font-bold text-lg">
        Pesan Sekarang
      </footer>
    </Suspense>
  );
};
