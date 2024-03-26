import { DataTable } from '@fms/organisms';
import { FC, ReactElement } from 'react';

export const DashboardStockOpname: FC = (): ReactElement => {
  const columns = [
    {
      header: 'Nama bahan',
      accessorKey: 'name',
    },
    {
      header: 'Jumlah Stok',
      accessorKey: 'jumlah',
    },
    {
      header: 'Tindakan',
      accessorKey: 'action',
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Stock Opname</h1>
      <DataTable
        data={[
          { name: 'Susu', jumlah: '20 ml', action: 'Tambah Stok' },
          { name: 'Kopi', jumlah: '20 ml', action: 'Tambah Stok' },
        ]}
        columns={columns}
      />
    </div>
  );
};
