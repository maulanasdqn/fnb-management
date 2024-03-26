import { FC, ReactElement } from 'react';

export const SelectedMenu: FC = (): ReactElement => {
  return (
    <div className="fixed bottom-4 flex items-center justify-start h-auto left-4 right-4 w-auto bg-primary z-10 rounded-xl p-4 shadow-md">
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full justify-between h-full gap-x-4">
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-fit max-w-1/2">
              <h1 className="text-xl text-white font-medium">2 Pesanan</h1>
              <p className="text-lg text-white font-normal truncate w-[250px]">
                Serasa Erat Kopi Susu, Cokelat Susu, Cokelat Susu
              </p>
            </div>
            <h1 className="text-xl text-white font-medium">Rp. 200.000</h1>
          </div>
        </div>
      </div>
    </div>
  );
};