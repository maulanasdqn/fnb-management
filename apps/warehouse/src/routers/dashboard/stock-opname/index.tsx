import { Button } from '@fms/atoms';
import { DataTable } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const DashboardStockOpname: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchParams] = useSearchParams();
  const { data } = trpc.stockOpname.index.useQuery({
    search: debounceValue || undefined,
    page: Number(searchParams.get('page')),
    perPage: Number(searchParams.get('perPage')),
  });
  const dataDummies = [
    { name: 'Susu', jumlah: '400 ml' },
    { name: 'Kopi', jumlah: '4000 g' },
    { name: 'Teh', jumlah: '2000 g' },
    { name: 'Gula', jumlah: '4000 g' },
    { name: 'Sirup Banana', jumlah: '600 ml' },
    { name: 'Sirup Orange', jumlah: '500 ml' },
  ];
  const columns: ColumnDef<any>[] = [
    {
      header: 'No',
      accessorKey: 'index',
      cell: ({ row }) => row.index + 1,
      size: 8,
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
            <Link to={`#`} key={row.original.id}>
              <Button variant={'info'} title="Detail">
                Detail
              </Button>
            </Link>
            <Button variant={'warning'} title="Update">
              Update
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="flex flex-col gap-y-2 w-full">
        <small className="text-grey-500">Stock Opname List /</small>
        <h1 className="text-3xl font-bold ">Stock Opname</h1>
      </div>
      <DataTable
        data={dataDummies || data?.data || []}
        columns={columns}
        handleSearch={(e) => setSearch(e.target.value)}
        createLink="#"
        createLabel="+ Tambah stock"
      />
    </div>
  );
};
