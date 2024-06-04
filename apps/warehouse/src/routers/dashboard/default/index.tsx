import { FC, ReactElement } from 'react';
import { LineGraph, PieChart } from './modules/graph';
import { CardOverview } from './modules/card-overview';
import { Notification } from './modules/notification';
import { recapData } from './store';
import { TableOverview } from './modules/table-overview';
export const Dashboard: FC = (): ReactElement => {
  return (
    <div className="flex flex-col w-full  bg-white rounded-lg p-4">
      <h1 className="font-bold text-2xl">Warehouse Admin Managament</h1>
      <div className="my-4">
        <h2 className="text-xl font-bold">Rekapitulasi Data</h2>
        <small className="text-grey-500">Manage And Maintain Your Data</small>
      </div>
      <Notification />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardOverview data={recapData} />
        <div className="bg-white text-grey-700 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Revenue</h3>
          <LineGraph />
        </div>
      </div>
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 bg-white text-grey-700 p-3 rounded-lg shadow-md">
          <TableOverview />
        </div>
        <div className="md:w-1/3 bg-white text-grey-700 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Total Sales</h3>
          <PieChart />
        </div>
      </div>
    </div>
  );
};
