import { Button } from '@fms/atoms';
import { DataTable } from '@fms/organisms';
import { formatedDate } from '@fms/utilities';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';


export const DashboardTransaction: FC = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const data = [
    { name: 'Kopi Susu Banana', jumlah: '1 pcs',total : 'Rp. 15.000', createAt : new Date() },
    { name: 'Coffee Milk', jumlah: '1 pcs',total : 'Rp. 20.000',createAt : new Date() },
    { name: 'Americano', jumlah: '1 pcs', total : 'Rp. 15.000',createAt : new Date() },
    { name: 'Latte', jumlah: '2 pcs', total : 'Rp. 30.000',createAt : new Date() },
    { name: 'Latte', jumlah: '1 pcs', total : 'Rp. 10.000',createAt : new Date() },
    { name: 'Americano', jumlah: '2 pcs', total : 'Rp. 24.000',createAt : new Date() },
    { name: 'Coffee Milk', jumlah: '1 pcs', total : 'Rp. 15.000',createAt : new Date() },
    
  ]
  const columns: ColumnDef<any>[] = [
    {
      header: 'Tanggal',
      accessorKey: 'name',
      cell: ({ cell }) => <p>{formatedDate(cell?.row?.original?.createdAt as Date)}</p>,
    },
    {
      header: 'Nama Produk',
      accessorKey: 'name',
    },
    {
      header: 'Jumlah',
      accessorKey: 'jumlah',
    },
    {
      header: 'Total Harga',
      accessorKey: 'total',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ cell }) => (
        <div className="flex gap-x-3 items-center">
          <div className='text-white bg-primary-600 px-2 py-1 rounded-md text-xs'>
            <p>
              Selesai
            </p>
          </div>
        </div>
      )
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">Stock Opname</h1>
      <DataTable
        data={data}
        columns={columns}
        handleSearch={(e) => setSearch(e.target.value)}
        createLink="create"
        createLabel="Export to csv"
      />
    </div>
  );
};
