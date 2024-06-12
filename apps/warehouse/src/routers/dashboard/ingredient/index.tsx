import { Button } from '@fms/atoms';
import { DataTable } from '@fms/organisms';
import { formatedDate } from '@fms/utilities';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

type TInggrdient = {
  id: string;
  name: string;
  createdAt: Date;
};

export const DashboardIngredient: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const data = [
    {
      id: '1',
      name: 'Coffee',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Milk',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'Tea',
      createdAt: new Date(),
    },
    {
      id: '4',
      name: 'Water',
      createdAt: new Date(),
    },
    {
      id: '5',
      name: 'Sugar',
      createdAt: new Date(),
    },
    {
      id: '6',
      name: 'Ice',
      createdAt: new Date(),
    },
    {
      id: '7',
      name: 'Strawberry',
      createdAt: new Date(),
    },
  ];

  const columns: ColumnDef<TInggrdient>[] = [
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
      header: 'Action',
      accessorKey: 'action',
      cell({ row }) {
        return (
          <div className="flex gap-x-3 items-center">
            <Link to={`${row.original.id}/edit`} key={row.original.id}>
              <Button variant={'warning'} title="Edit">
                Edit
              </Button>
            </Link>
            <Button variant={'error'} title="Delete">
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 w-full">
        <small className="text-grey-500">Inggredient List /</small>
        <h1 className="text-3xl font-bold ">Inggredients</h1>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-md h-auto">
        <DataTable
          data={data || []}
          columns={columns}
          handleSearch={(e) => setSearch(e.target.value)}
          createLink="create"
          createLabel="+ Tambah Inggredient"
        />
      </div>
    </section>
  );
};
