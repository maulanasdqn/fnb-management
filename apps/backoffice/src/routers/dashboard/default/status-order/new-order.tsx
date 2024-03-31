import { Button } from '@fms/atoms';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const NewOrder: FC = (): ReactElement => {
  return (
    <section className="flex flex-col gap-y-4 text-black">
      <div className="flex md:flex-row flex-col gap-y-2 md:justify-between w-full shadow-lg md:h-[100px] h-auto rounded-md bg-white md:p-4 p-2">
        <div className="flex flex-col">
          <p>No order Id : 120045</p>
          <p>Waktu Order : 14.11</p>
          <p>Pesanan : Serasa erat Kopi, Serasa ...</p>
        </div>
        <div className="flex  items-center">
          <Link to="/dashboard/detail">
            <Button size="sm">Lihat detail</Button>
          </Link>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-y-2 md:justify-between w-full shadow-lg md:h-[100px] h-auto rounded-md bg-white md:p-4 p-2">
        <div className="flex flex-col">
          <p>No order Id : 1156</p>
          <p>Waktu Order : 13.20</p>
          <p>Pesanan : Serasa erat Kopi, Serasa ...</p>
        </div>
        <div className="flex  items-center">
          <Link to="/dashboard/detail">
            <Button size="sm">Lihat detail</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
