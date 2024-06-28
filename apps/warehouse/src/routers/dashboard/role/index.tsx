import { Button, ToastWrapper } from '@fms/atoms';
import { TRole } from '@fms/entities';
import { DataTable } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { formatedDate, useDebounce } from '@fms/utilities';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const DashboardRole: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { data, refetch } = trpc.role.findMany.useQuery({
    search: debounceValue || undefined,
  });
  const { mutate } = trpc.role.delete.useMutation();
  useDebounce(() => {
    setDebounceValue(search);
  }, 500);

  const columns: ColumnDef<TRole>[] = [
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
            <Button
              variant={'error'}
              title="Delete"
              onClick={() =>
                mutate(
                  { id: row?.original?.id as string },
                  {
                    onSuccess: () => {
                      toast.success('Role Berhasil dihapus');
                      refetch();
                    },
                  }
                )
              }
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <section className="flex flex-col gap-y-4">
      <ToastWrapper />
      <div className="flex flex-col gap-y-2 w-full">
        <small className="text-grey-500">Role List /</small>
        <h1 className="text-3xl font-bold ">Role</h1>
      </div>
      <div className="w-full bg-white rounded-md p-4 shadow-md h-auto">
        <DataTable
          data={data?.data || []}
          columns={columns as TRole[]}
          handleSearch={(e) => setSearch(e.target.value)}
          createLink="create"
          createLabel="+ Tambah Role"
        />
      </div>
    </section>
  );
};
