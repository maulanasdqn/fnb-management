import { Button } from '@fms/atoms';
import { trpc } from '@fms/trpc-client';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const NewOrder: FC = (): ReactElement => {
  const data = trpc.order.findMany.useQuery();

  const filterData = data?.data?.filter((item) => item.status === 'ordered');
  return (
    <section className="flex flex-col gap-y-4 text-black">
      {filterData?.map((item) => (
        <div
          key={item.id}
          className="flex md:flex-row flex-col gap-y-2 md:justify-between w-full shadow-lg md:h-[100px] h-auto rounded-md bg-white md:p-4 p-2"
        >
          <div className="flex flex-col">
            <p>No order Id : {item.id}</p>
            <p>Customer : {item.customer.name}</p>
            <p>Invoice Number : {item.invoiceNumber}</p>
            <p>
              Pesanan :{' '}
               {item.orderDetails.map((val, index) => (
                <span key={val.product.id}>
                  {val.product.name}
                  {index < item.orderDetails.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
          <div className="flex items-center">
            <Link to="/dashboard/detail">
              <Button size="sm">Lihat detail</Button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};
