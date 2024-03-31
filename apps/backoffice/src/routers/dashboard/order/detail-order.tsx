import { ControlledFieldText } from '@fms/organisms';
import { FC, ReactElement, SetStateAction, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@fms/atoms';
import { Link } from 'react-router-dom';

export const DetailOrder: FC = ({ ...props }): ReactElement => {
  const { control } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handlePaymentChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
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
                Lihat resep
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <img src="/asset1.jpg" alt="cofee" width={100} height={100} />
            <div className="flex items-center gap-x-3 "></div>
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
                Lihat resep
              </div>
            </Link>
          </div>
          {/* detail gambar dan jumlah */}
          <div className="flex flex-col gap-2 ">
            <img src="/no-photo.jpg" alt="cofee" width={100} height={100} />
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
                Lihat resep
              </div>
            </Link>
          </div>
          {/* detail gambar dan jumlah */}
          <div className="flex flex-col gap-2 ">
            <img src="/no-photo.jpg" alt="cofee" width={100} height={100} />
          </div>
        </div>
        <footer className="relative fixed bottom-0 w-full h-[40px] pt-1 rounded-md text-center bg-success-400 justify-center items-center text-white font-bold text-lg">
          Proses Pesanan
        </footer>
      </section>
    </Suspense>
  );
};
