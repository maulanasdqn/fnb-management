import { Button } from '@fms/atoms';
import { DataTable } from '@fms/organisms';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const DashboardStockOpname: FC = (): ReactElement => {
  const [search, setSearch] = useState<string>('');

  const data = [
    { name: 'Susu', jumlah: '20 ml', action: 'Tambah Stok' },
    { name: 'Kopi', jumlah: '20 ml', action: 'Tambah Stok' },
  ]
  const columns: ColumnDef<any>[] = [
    {
      header: 'No',
      accessorKey: 'index',
      cell: ({ row }) => row.index + 1,
      size:8,
      maxSize: 10,
    },
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
      cell({ row }) {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={`${row.original.id}/edit`} key={row.original.id}>
              <Button variant={'info'} title="Detail">
                Detail
              </Button>
            </Link>
            <Button variant={'primary'} title="konfirmasi">
              Konfirmasi
            </Button>
          </div>
        );
      },
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
        createLabel="+ Tambah Data stock"
      />
    </div>
  );
};
