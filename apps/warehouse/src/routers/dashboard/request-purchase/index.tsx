import { Button } from '@fms/atoms';
import { DataTable } from '@fms/organisms';
import { formatedDate } from '@fms/utilities';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const DashboardRequestPurchase: FC = (): ReactElement => {
  const data = [
    { name: 'Susu', jumlah: '40 ml',requestBy : 'Admin',createAt : new Date() },
    { name: 'Kopi', jumlah: '30 ml',requestBy : 'Admin',createAt : new Date() },
    { name: 'Gula', jumlah: '80 ml', requestBy : 'Admin',createAt : new Date() },
    { name: 'Sirup banana', jumlah: '100 ml', requestBy : 'Admin',createAt : new Date() },
    { name: 'Sirup Avocado', jumlah: '50 ml', requestBy : 'Admin',createAt : new Date() },
    { name: 'Sirup strawberry', jumlah: '100 ml', requestBy : 'Admin',createAt : new Date() },
    { name: 'Coklat', jumlah: '30 g', requestBy : 'Admin',createAt : new Date() },
    
  ]
  const [search, setSearch] = useState<string>('');
  const columns: ColumnDef<any>[] = [
    {
      header: 'No',
      accessorKey: 'index',
      cell: ({ row }) => row.index + 1,
      size:8,
      maxSize: 10,
    },
    {
      header: 'Tanggal',
      accessorKey: 'name',
      cell: ({ cell }) => <p>{formatedDate(cell?.row?.original?.createdAt as Date)}</p>,
    },
    {
      header: 'Nama bahan',
      accessorKey: 'name',
    },
    {
      header: 'Jumlah',
      accessorKey: 'jumlah',
    },
    {
      header: 'Request by',
      accessorKey: 'requestBy',
    },
    {
      header: 'Tindakan',
      accessorKey: 'action',
      cell({ row }) {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={`${row.original.id}/edit`} key={row.original.id}>
              <Button variant={'info'} title="detail">
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
    <div className="flex flex-col gap-y-4">
     <div className="flex flex-col gap-y-2 w-full">
      <small className="text-grey-500">Request Purchase List /</small>
      <h1 className="text-3xl font-bold ">Request Purchase</h1>
    </div>
      <DataTable
        data={data}
        columns={columns}
        handleSearch={(e) => setSearch(e.target.value)}
        createLink="create"
        createLabel="+ Tambah Data"
      />
    </div>
  );
};
