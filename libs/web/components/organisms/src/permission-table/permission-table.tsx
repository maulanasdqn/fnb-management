import { useMemo } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Button } from '@fms/atoms';

interface Permission {
  id: string;
  key: string;
  name: string;
  checked?: boolean;
}

interface GroupedPermissions {
  [group: string]: {
    [parent: string]: Permission[];
  };
}

interface PermissionsTableProps {
  groupKeys?: string[];
  collapsedGroups: { [key: string]: boolean };
  handleGroupCollapse: (group: string) => void;
  groupedPermissions?: GroupedPermissions;
  control: any;
  columns: ColumnDef<any>[]; // Updated type here
  currentPermissions?: string[];
  handlePermissionChange?: (permission: Permission) => void;
}

export const PermissionsTable = (props: PermissionsTableProps) => {
  const memoizeColumns = useMemo(() => props.columns, [props.columns]);
  const memoizeData = useMemo(() => {
    const data: { parent: string; permissions: Permission[] }[] = [];
    if (props.groupedPermissions) {
      Object.keys(props.groupedPermissions).forEach((group) => {
        props.groupedPermissions &&
          Object.entries(props?.groupedPermissions[group])?.forEach(
            ([parent, permissions]) => {
              data.push({ parent, permissions });
            }
          );
      });
    }
    return data;
  }, [props.groupedPermissions]);
  
  const table = useReactTable({
    data: memoizeData,
    columns: memoizeColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="border border-grey-100 rounded-md shadow-sm flex flex-col gap-y-2">
      {props.groupKeys?.map((group) => {
       
        return (
          <div key={group}>
            <div className="flex items-center gap-x-2 px-8 py-2">
              <Button
                type="button"
                onClick={() => props.handleGroupCollapse(group)}
                className="px-2 rounded text-lg font-medium"
              >
                {props.collapsedGroups[group] ? '+' : '-'}
              </Button>
              <h3>{group}</h3>
            </div>
            {!props.collapsedGroups[group] && (
              <section className="flex flex-col gap-y-2 bg-grey-50 py-2 pl-16">
                <div className="w-full">
                  <table className="min-w-full">
                    <thead>
                      {table.getHeaderGroups().map(
                        (headerGroup) =>
                          headerGroup.id === group && (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map((header) => (
                                <th
                                  key={header.id}
                                  className="font-semibold text-left px-4 py-2"
                                >
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </th>
                              ))}
                            </tr>
                          )
                      )}
                    </thead>
                    <tbody className="bg-white">
                      {table.getRowModel().rows.map(
                        (row, idx) =>
                          row.original.permissions.some((permission: { group: string; }) =>
                            permission.group === group
                          ) && (
                            <tr key={row.id}>
                              {row._getAllVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className="border-b border-grey-100 px-2 py-2"
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              ))}
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        );
      })}
    </div>
  );
};
