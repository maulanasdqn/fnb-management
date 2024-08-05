import { Button } from "@fms/atoms";
import { TUser } from "@fms/entities";
import { DataTable } from "@fms/organisms";
import { trpc } from "@fms/trpc-client";
import { formatedDate } from "@fms/utilities";
import { ColumnDef } from "@tanstack/react-table";
import { FC, ReactElement, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const DashboardUser: FC = (): ReactElement => {
    const [debounceValue, setDebounceValue] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [searchParams] = useSearchParams();
    const { mutate } = trpc.user.delete.useMutation();
    const { data, refetch } = trpc.user.index.useQuery({
      search: debounceValue || undefined,
      page: Number(searchParams.get('page')),
      perPage: Number(searchParams.get('perPage')),
    });
  
    const columns: ColumnDef<TUser>[] = [
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
          header: 'Fullname',
          accessorKey: 'fullname',
        },
        {
            header:'Role',
            accessorKey:'role.name',
        },
        {
          header: 'Action',
          accessorKey: 'action',
          cell: ({ row }) => (
            <div className="flex gap-x-3 items-center">
              <Link to={`${row.original?.id}/edit`} key={row.original?.id}>
                <Button variant={'warning'} title="Edit">
                  Edit
                </Button>
              </Link>
              <Button
                variant={'error'}
                title="Delete"
                onClick={() => {
                  mutate(
                    { id: row.original?.id as string },
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
            <small className="text-grey-500">User List /</small>
            <h1 className="text-3xl font-bold ">Users</h1>
          </div>
          <div className="w-full bg-white rounded-md p-4 shadow-md h-auto">
            <DataTable
              data={data?.data || []}
              meta={data?.meta}
              columns={columns as TUser[]}
              handleSearch={(e) => setSearch(e.target.value)}
              createLink="create"
              createLabel="+ Tambah User"
            />
          </div>
        </section>
      );
}