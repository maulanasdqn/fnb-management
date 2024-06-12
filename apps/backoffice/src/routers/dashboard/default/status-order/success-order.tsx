import { Button } from '@fms/atoms';
import { Modal } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { capitalizeWords, formatedDate } from '@fms/utilities';
import { FC, ReactElement, useState } from 'react';


export const SuccessOrder: FC = (): ReactElement => {
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const data = trpc.order.findMany.useQuery();
  const filterData = data?.data?.filter((item) => item.status === 'delivered');
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
            <p>Invoice Number :{item.invoiceNumber}</p>
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
            <Button size="sm" onClick={() => setDetailModal(true)}>Lihat detail</Button>
          </div>
        </div>
      ))}
      {detailModal && (
        <Modal
          isOpen={detailModal}
          onClose={() => setDetailModal(false)}
          header
          title="Detail Pesanan"
        >
          <div className="flex flex-col gap-y-5 p-5 bg-gray-100">
            {filterData?.map((val) => (
              <div key={val.id} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold">No order : {val.id}</p>
                <p className="text-gray-700">
                  Tanggal Order : {formatedDate(val.createdAt as Date)}
                </p>
                <p className="text-gray-700">Customer : {val.customer.name}</p>
                <p className="text-gray-700">
                  Invoice Number : {val.invoiceNumber}
                </p>
                <p> Nomer Meja : {capitalizeWords(val.place.name)}</p>
                <p className="mt-1 text-gray-700">
                  Status :{' '}
                  <span className="bg-primary text-white p-1 rounded-md">
                    {val.status === 'delivered'
                      ? 'Selesai Diproses'
                      : val.status}
                  </span>
                </p>

                <div className="mt-2">
                  <p className="font-semibold">Pesanan :</p>
                  {val.orderDetails.map((item, index) => (
                    <div key={item.product.id} className="flex items-center">
                      <span className="text-gray-600">
                        {item.product.name}
                        {index < val.orderDetails.length - 1},
                      </span>
                      <p className="ml-2 text-gray-500">
                        Jumlah : {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-semibold">Total : {val.amountTotal}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
};
