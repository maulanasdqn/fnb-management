import { Button } from '@fms/atoms';
import { EOrderStatus, TOrderSingleResponse } from '@fms/entities';
import { Modal } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { capitalizeWords, formatedDate } from '@fms/utilities';
import { FC, ReactElement, useState } from 'react';

export const SuccessOrder: FC = (): ReactElement => {
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<
  TOrderSingleResponse['data'] | null
>(null);
  const { data } = trpc.order.findMany.useQuery();
  const filterData = data?.data?.filter(
    (item) => item.status === EOrderStatus.DELIVERED && item.isPaid ===true
  );
  const handleDetailClick = (item: TOrderSingleResponse['data']) => {
    setSelectedItem(item);
    setDetailModal(true);
  };
  return (
    <section className="flex flex-col gap-y-4 text-black">
      {(filterData?.length || 0) < 1 ? (
        <div>
          <p className="font-semibold text-base text-grey-600 text-center">
            Belum ada Pesanan Selesai
          </p>
        </div>
      ) : (
        filterData?.map((item) => (
          <div
            key={item.id}
            className="flex md:flex-row flex-col gap-y-2 md:justify-between w-full shadow-lg md:h-[100px] h-auto rounded-md bg-white md:p-4 p-2"
          >
            <div className="flex flex-col">
            <p>Invoice Number :{item.invoiceNumber}</p>
              <p>Nama Pelanggan : {item.customer?.name}</p>
              <p>Tipe Pesanan: {item.type}</p>
              <p>
                Pesanan :{' '}
                {item.details?.map((val, index) => (
                  <span key={val.product.id}>
                    {val.product.name}
                    {index < (item.details?.length || 0) - 1 && ', '}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex items-center">
              <Button size="sm" onClick={() => handleDetailClick(item)}>
                Lihat detail
              </Button>
            </div>
          </div>
        ))
      )}
     {detailModal && selectedItem && (
        <Modal
          isOpen={detailModal}
          onClose={() => setDetailModal(false)}
          header
          title="Detail Pesanan"
        >
          <div className="flex flex-col p-5 bg-gray-100">
            <div className="flex flex-col gap-y-2 p-4 bg-white rounded-lg shadow-md">
              <p className="text-gray-700">
                Nomor Invoice :{' '}
                <span className="font-semibold">
                  {selectedItem.invoiceNumber}
                </span>
              </p>
              <p className="text-gray-700">
                Nama Pelanggan : {selectedItem.customer?.name}
              </p>
              <p className="text-gray-700">
                Tanggal Order : {formatedDate(selectedItem.createdAt as Date)}
              </p>
              <p>
                Nomer Meja :{' '}
                {capitalizeWords(selectedItem.place?.name as string)}
              </p>
              <p>Tipe Pesanan : {selectedItem.type}</p>
              <p>Metode Bayar : {selectedItem.payment?.name}</p>
              <p className="mt-1 text-gray-700">
                Status :{' '}
                <span className="bg-primary text-white p-1 rounded-md">
                  {selectedItem.status === EOrderStatus.DELIVERED
                    ? 'Pesanan Selesai'
                    : selectedItem.status}
                </span>
              </p>
              <div className="mt-2">
                <p className="font-semibold">Pesanan :</p>
                {selectedItem.details?.map((item, index) => (
                  <div key={item.product.id} className="flex items-center">
                    <span className="text-gray-600">
                      {item.product.name}
                      {index < (selectedItem.details?.length || 0) - 1 && ', '}
                    </span>
                    <p className="ml-2 text-gray-500">
                      Jumlah : {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-semibold">
                Total : {selectedItem.amountTotal}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
