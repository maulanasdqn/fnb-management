import { ControlledFieldText } from '@fms/organisms';
import { FC, ReactElement, SetStateAction, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@fms/atoms';
import { Link } from 'react-router-dom';
import { TSelectedMenu } from './modules/selected-menu';

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
        <div className="flex justify-between border border-slate rounded-md w-full h-auto p-2 my-4">
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">Serasa Kopi Susu</h1>
            <div className="text-xs">
              <p className="font-bold">
                Size : <span className="font-normal">Reguler</span>
              </p>
              <p className="font-bold">
                Ice Level : <span className="font-normal">Reguler</span>
              </p>
              <p className="font-bold">
                Sugar level : <span className="font-normal">Reguler</span>
              </p>
              <p className="font-bold">
                Pilihan Toping : <span className="font-normal">Reguler</span>
              </p>
            </div>
            <Link to={'/detail'}>
              <div className="flex w-[100px]  border justify-center items-center text-sm mt-4 text-success-400 font-bold rounded-md border-success-200 ">
                Ubah variant
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <img src="/asset1.jpg" alt="cofee" width={100} height={100} />
            <div className="flex items-center gap-x-3 ">
              <Button
                className={`w-8 h-8 rounded-full text-xl border-2  text-center font-bold flex items-center justify-center border-primary-700 text-primary-700 disabled:border-grey-300 disabled:text-grey-300`}
                onClick={handlerMinusQuantity}
                disabled={updateQuantity === 1}
              >
                -
              </Button>
              <p>{updateQuantity}</p>
              <Button
                className="w-8 h-8 rounded-full text-xl border-2 border-primary-700 text-center text-primary-700 font-bold flex items-center justify-center"
                onClick={handlerAddQuantity}
              >
                +
              </Button>
            </div>
            <p className="text-xs">Harga: Rp.{updateTotalPrice}</p>
          </div>
        </div>
        <div className="flex justify-between border border-slate rounded-md w-full h-auto p-4 my-4">
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">Serasa Shake Manggo</h1>
            <div className="text-xs">
              <p className="font-bold">
                Size : <span className="font-normal">Reguler</span>
              </p>
              <p className="font-bold">
                Ice Level : <span className="font-normal">Extra Ice</span>
              </p>
              <p className="font-bold">
                Sugar level : <span className="font-normal">Reguler</span>
              </p>
              <p className="font-bold">
                Pilihan Toping : <span className="font-normal">Reguler</span>
              </p>
            </div>
            <Link to={'/detail'}>
              <div className="flex border w-[100px] justify-center items-center text-sm mt-4 text-success-400 font-bold rounded-md border-success-200 ">
                Ubah variant
              </div>
            </Link>
          </div>
          {/* detail gambar dan jumlah */}
          <div className="flex flex-col gap-2 ">
            <img src="/no-photo.jpg" alt="cofee" width={100} height={100} />
            <div className="flex items-center gap-x-3 ">
              <Button
                className={`w-8 h-8 rounded-full text-xl border-2  text-center font-bold flex items-center justify-center border-primary-700 text-primary-700 disabled:border-grey-300 disabled:text-grey-300`}
                onClick={handlerMinusQuantity}
                disabled={updateQuantity === 1}
              >
                -
              </Button>
              <p>{updateQuantity}</p>
              <Button
                className="w-8 h-8 rounded-full text-xl border-2 border-primary-700 text-center text-primary-700 font-bold flex items-center justify-center"
                onClick={handlerAddQuantity}
              >
                +
              </Button>
            </div>
            <p className="text-xs">Harga: Rp.{updateTotalPrice}</p>
          </div>
        </div>
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
