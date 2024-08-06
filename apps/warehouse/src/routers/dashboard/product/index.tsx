import { Button } from '@fms/atoms';
import { TProduct } from '@fms/entities';
import { DataTable } from '@fms/organisms';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, Suspense, useState } from 'react';
import { trpc } from '@fms/trpc-client';
import { formatedDate, useDebounce } from '@fms/utilities';
import { Link, useSearchParams } from 'react-router-dom';
export const DashboardProduct: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchParams] = useSearchParams();

  useDebounce(() => {
    setDebounceValue(search);
  }, 500);

  const { data, refetch } = trpc.product.findMany.useQuery({
    search: debounceValue || undefined,
    page: Number(searchParams.get('page')),
    perPage: Number(searchParams.get('perPage')),
  });

  const { mutate } = trpc.product.delete.useMutation();

  const columns: ColumnDef<TProduct>[] = [
    {
      header: 'No',
      accessorKey: 'index',
      size: 8,
      maxSize: 10,
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ cell }) => (
        <p>{formatedDate(cell?.row?.original?.createdAt as Date)}</p>
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
      cell({ row }) {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={`${row.original.id}/edit`} key={row.original.id}>
              <Button variant={'warning'} title="Edit">
                Edit
              </Button>
            </Link>
            <Button
              variant={'error'}
              title="Delete"
              onClick={() => {
                mutate(
                  { id: row?.original?.id as string },
                  {
                    onSuccess: () => {
                      refetch();
                    },
                  }
                );
              }}
            >
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
        <div className="flex flex-col gap-y-2 w-full">
          <small className="text-grey-500">Product List /</small>
          <h1 className="text-3xl font-bold ">Product</h1>
        </div>
        <DataTable
          data={data?.data || []}
          meta={data?.meta}
          columns={columns}
          handleSearch={(e) => setSearch(e.target.value)}
          createLink="create"
          createLabel="+ Tambah Produk"
          
        />
      </div>
    </Suspense>
  );
};
