import { Icon } from '@iconify/react';
import { FC, ReactElement } from 'react';

export const CheckoutSuccessPage: FC = (): ReactElement => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-start lg:justify-center mt-12 py-8 lg:mt-0 ">
      <div className="flex w-4/6 h-4/6 lg:w-1/4 relative lg:h-1/4 aspect-square lg:aspect-auto z-10 items-center justify-center p-6 bg-warning-200 text-white rounded-full">
        <div className="w-4/6 h-4/6 aspect-square bg-warning-300 p-4 rounded-full absolute z-20 animate-ping"></div>
        <div className="flex w-full h-full aspect-square bg-warning-400 p-4 rounded-full justify-center items-center z-30">
          <Icon icon="svg-spinners:clock" width={28} className="h-full w-4/6" />
        </div>
      </div>
      <div className="text-grey-800 mt-12 text-center font-bold text-2xl lg:text-5xl text-gray-700 ">
        <h1>Mohon ditunggu </h1>
        <h1>
          Pesanan Anda Sedang diproses
        </h1>
      </div>
    </section>
  );
};
