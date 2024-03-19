import { Button, InputText } from '@fms/atoms';
import { Icon } from '@iconify/react';
import { FC, ReactElement } from 'react';

export const MenuPage: FC = (): ReactElement => {
  return (
    <section className="w-full min-h-screen ">
      <div className="flex items-center justify-center w-full h-56 bg-primary-800 p-2">
        <h1 className="text-2xl font-bold text-white">Serasa Erat Kopi</h1>
      </div>
      <div className="flex items-center text-lg px-2 justify-center w-9/12 h-20 shadow-md rounded-lg -mt-8 bg-white mx-auto mb-3">
        <h1>Pesan Minuman Anda Sekarang </h1>
      </div>
      <div className='text-center text-xl font-medium mb-4'>
          <h1>Rekomendasi</h1>
        </div>
      <section className="grid grid-cols-2 w-full px-3 gap-4">
        <div className=" flex flex-col max-w-sm bg-white rounded-lg gap-y-3">
          <figure className='flex flex-col gap-y-2'>
            <img src="/asset1.jpg" alt="" className='object-contain rounded-lg'/>
            <figcaption className='text-left font-bold text-base'>Serasa Kopi Susu</figcaption>
            <h2 className='text-left font-bold text-base'>15.000</h2>
          </figure>
          <div>
            <Button type="button" className='w-full bg-white border-primary-800  border rounded-2xl text-primary-800'>Pesan</Button>
          </div>
        </div>
        <div className=" flex flex-col max-w-sm bg-white rounded-lg gap-y-3">
          <figure className='flex flex-col gap-y-2'>
            <img src="/asset1.jpg" alt="" className='object-contain rounded-lg'/>
            <figcaption className='text-left font-bold text-base'>Serasa Kopi Susu</figcaption>
            <h2 className='text-left font-bold text-base'>15.000</h2>
          </figure>
          <div>
            <Button type="button" className='w-full bg-white border-primary-800  border rounded-2xl text-primary-800'>Pesan</Button>
          </div>
        </div>
        <div className=" flex flex-col max-w-sm bg-white rounded-lg gap-y-3">
          <figure className='flex flex-col gap-y-2'>
            <img src="/asset1.jpg" alt="" className='object-contain rounded-lg'/>
            <figcaption className='text-left font-bold text-base'>Serasa Kopi Susu</figcaption>
            <h2 className='text-left font-bold text-base'>15.000</h2>
          </figure>
          <div>
            <Button type="button" className='w-full bg-white border-primary-800  border rounded-2xl text-primary-800'>Pesan</Button>
          </div>
        </div>
        <div className=" flex flex-col max-w-sm bg-white rounded-lg gap-y-3">
          <figure className='flex flex-col gap-y-2'>
            <img src="/asset1.jpg" alt="" className='object-contain rounded-lg'/>
            <figcaption className='text-left font-bold text-base'>Serasa Kopi Susu</figcaption>
            <h2 className='text-left font-bold text-base'>15.000</h2>
          </figure>
          <div>
            <Button type="button" className='w-full bg-white border-primary-800  border rounded-2xl text-primary-800'>Pesan</Button>
          </div>
        </div>
      </section>
    </section>
  );
};
