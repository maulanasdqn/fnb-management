import { TProduct } from '@fms/entities';
import { DataTable } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { Icon } from '@iconify/react';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const DashboardProduct: FC = (): ReactElement => {
  const { data, isLoading } = trpc.product.findMany.useQuery({
    search: undefined,
  });

  const columns: ColumnDef<TProduct>[] = [
    {
      header: 'No',
      accessorKey: 'index',
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Gambar',
      accessorKey: 'image',
      cell: ({ cell }) => (
        <img
          width={40}
          src={
            cell.row.original?.image ? cell.row.original.image : '/no-photo.jpg'
          }
          alt="gambar"
        />
      ),
    },
    {
      header: 'Nama Produk',
      accessorKey: 'name',
    },
    {
      header: 'Harga',
      accessorKey: 'priceSelling',
    },
    {
      header: 'Deskripsi',
      accessorKey: 'description',
    },
    {
      header: 'Aksi',
      accessorKey: 'action',
      cell({row}) {
        return (
          <Link to={`/dashboard/product/${row.original.id}/edit`}>
            <Icon icon="fa:edit" />
          </Link>
        );
      },
    },
  ];

  const dataDummy: TProduct[] = [
    {
      id: '1',
      image: '/asset1.jpg',
      name: 'Serasa Erat Kopi',
      priceSelling: 5000,
      createdAt: null,
      updatedAt: null,
      description: ' Susu , Kopi dan Gula Aren',
    },
    {
      id: '2',
      image: '',
      name: 'Serasa Shake Manggo',
      priceSelling: 5000,
      createdAt: null,
      updatedAt: null,
      description: ' Susu , Kopi dan Gula Aren',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1>Ini tabel Produk</h1>
      <DataTable data={data || []} columns={columns} />
    </div>
  );
};
