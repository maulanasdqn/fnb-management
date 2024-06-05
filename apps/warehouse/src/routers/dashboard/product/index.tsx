import { Button } from '@fms/atoms';
import { TProduct } from '@fms/entities';
import { DataTable } from '@fms/organisms';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, Suspense, useState } from 'react';
import { trpc } from '@fms/trpc-client';
import { useDebounce } from '@fms/utilities';
import { Link } from 'react-router-dom';
export const DashboardProduct: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  useDebounce(() => {
    setDebounceValue(search);
  }, 500);

  const { data, refetch } = trpc.product.findMany.useQuery({
    search: debounceValue || undefined,
  });

  const { mutate } = trpc.product.delete.useMutation()

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
      header: 'Aksi',
      accessorKey: 'action',
      cell({ row}) {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={`${row.original.id}/edit`} key={row.original.id}>
              <Button variant={'warning'} title="Edit">
                Edit
              </Button>
            </Link>
            <Button variant={'error'} title="Delete" onClick={()=> {
              mutate({ id: row?.original?.id as string}, {
                onSuccess: () => {
                  refetch()
                }
              })
          }}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <DataTable
          data={data?.data || []}
          columns={columns}
          handleSearch={(e) => setSearch(e.target.value)}
          createLink='create'
          createLabel='+ Tambah Produk'
          searchBox
        />
      </div>
    </Suspense>
  );
};
