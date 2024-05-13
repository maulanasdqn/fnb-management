import { Icon } from '@iconify/react';
import { FC, ReactElement } from 'react';

export const Notification: FC = (): ReactElement => {
  return (
    <section className="flex gap-x-4 w-full rounded-md border border-primary-600 bg-gradient-to-r from-white to-neutral-200 p-3 mb-4">
      <Icon icon="ep:warning" width={20} />
      <div>
        <p>Stok Produk Anda dengan kode <span className='text-info cursor-pointer'>#E9016 hampir habis </span> tersisa 5 Pcs </p>
        <small className='text-info cursor-pointer'>Silahkan minta pengiriman baru</small>
      </div>
    </section>
  );
};
