import { Button } from '@fms/atoms';
import { TRole } from '@fms/entities';
import { DataTable } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { formatedDate, useDebounce } from '@fms/utilities';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

export const DashboardRole: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const {data} = trpc.role.findMany.useQuery({
    search: debounceValue || undefined
  })

  // const data: TRole[] = [
  //   { id: '1', name: 'super admin', permissions: ['edit', 'create', 'delete','read'], createdAt: new Date() },
  //   { id: '2', name: 'admin', permissions: ['read'], createdAt: new Date() },
  // ];
  useDebounce(() => {
    setDebounceValue(search);
  }, 500);

  const columns: ColumnDef<TRole>[] = [
    {
      header: 'No',
      accessorKey: 'index',
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ cell }) => <p>{formatedDate(cell?.row?.original?.createdAt as Date)}</p>,
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },

    // {
    //   header: 'Permissions',
    //   accessorKey: 'permissions',
    // },

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
        <small className="text-grey-500">Role List /</small>
        <h1 className="text-3xl font-bold ">Role</h1>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-md h-auto">
        <DataTable
          data={data?.data || []}
          columns={columns}
          handleSearch={(e) => setSearch(e.target.value)}
          createLink="create"
          createLabel="+ Tambah Role"
        />
      </div>
    </section>
  );
};
