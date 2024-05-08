import { Tabs } from '@fms/molecules';
import { FC, ReactElement } from 'react';
import { NewOrder } from './status-order/new-order';
import { ProcessOrder } from './status-order/process-order';
import { PaymentOrder } from './status-order/payment-order';
import { SuccessOrder } from './status-order/success-order';

export type Tab = {
  title: string;
  content: JSX.Element;
};

export const Dashboard: FC = (): ReactElement => {


  const item: Tab[] = [
    { title: 'Pesanan Masuk', content: <NewOrder /> },
    { title: 'Sedang Diproses', content: <ProcessOrder /> },
    {
      title: 'Belum Bayar',
      content: <PaymentOrder />,
    },
    { title: 'Selesai', content: <SuccessOrder /> },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold pb-8">Pemesanan</h1>
      <Tabs tabs={item} />
    </div>
  );
};
