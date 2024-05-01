import { FC, ReactElement } from 'react';
import { AreaGraph, LineGraph } from './graph';


export const Dashboard: FC = (): ReactElement => {
  return (
    <div className="flex flex-col w-full  bg-white rounded-lg p-4">
      <h1 className='font-bold text-2xl'>Warehouse Admin Managament</h1>
      <div className='my-8'>
        <h2 className='text-xl font-bold'>Rekapitulasi Data</h2>
      </div>
      <div className='grid grid-cols-2 w-full gap-x-2 '>
          <LineGraph/>
          <AreaGraph/>
      </div>
    </div>
  );
};
