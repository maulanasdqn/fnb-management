import { Button } from '@fms/atoms';
import { DataTable } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { formatedDate } from '@fms/utilities';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type IngredientData = Omit<
  {
    id: string;
    name: string;
    price: number;
    amount: number;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    logs?: { action: string; timestamp: Date }[] | undefined;
  },
  'stock' | 'logs'
>;

export const DashboardIngredient: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchParams] = useSearchParams();
  const { mutate } = trpc.product.delete.useMutation();
  const { data,refetch } = trpc.ingredient.findMany.useQuery({
    search: debounceValue || undefined,
    page: Number(searchParams.get('page')),
    perPage: Number(searchParams.get('perPage')),
  });

  const columns: ColumnDef<IngredientData>[] = [
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
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Jumlah',
      accessorKey: 'amount',
      size: 8,
      maxSize: 10,
    },
    {
      header: 'Harga',
      accessorKey: 'price',
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: ({ row }) => (
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
      ),
    },
  ];

  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 w-full">
        <small className="text-grey-500">Ingredient List /</small>
        <h1 className="text-3xl font-bold ">Ingredients</h1>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-md h-auto">
        <DataTable
          data={data?.data || []}
          meta={data?.meta}
          columns={columns}
          handleSearch={(e) => setSearch(e.target.value)}
          createLink="create"
          createLabel="+ Tambah Ingredient"
        />
      </div>
    </section>
  );
};
