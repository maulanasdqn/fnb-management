import { FC, ReactElement } from 'react';
import { AreaGraph, LineGraph } from './modules/graph';
import { CardOverview } from './modules/card-overview';
import { Notification } from './modules/notification';
import { recapData } from './store';
export const Dashboard: FC = (): ReactElement => {
  return (
    <div className="flex flex-col w-full  bg-white rounded-lg p-4">
      <h1 className='font-bold text-2xl'>Warehouse Admin Managament</h1>
      <div className='my-4'>
        <h2 className='text-xl font-bold'>Rekapitulasi Data</h2>
        <small className='text-grey-500'>Manage And Maintain Your Data</small>
      </div>
      <Notification/>
      <CardOverview data={recapData}/>
      <div className='grid grid-cols-2 w-full gap-x-2 '>
          <LineGraph/>
          <AreaGraph/>
      </div>
    </div>
  );
};
