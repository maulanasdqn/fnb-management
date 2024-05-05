import { ReactElement, useState } from 'react';
import { SortingState, flexRender, useReactTable } from '@tanstack/react-table';
import { getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import { Button, InputText } from '@fms/atoms';
import { Icon } from '@iconify/react';
import { TTable } from './type';

export const DataTable = <T extends Record<string, unknown>>(
  props: TTable<T>
): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <section className="shadow-md bg-white h-fit overflow-y-hidden border border-grey-50 p-4 rounded-lg w-full gap-y-4 flex flex-col overflow-x-auto">
      <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-4 md:items-center sticky z-10 w-full">
        <div className="w-fit">
          <InputText
            size="sm"
            placeholder="Cari data..."
            onChange={props.handleSearch}
          />
        </div>
        {props.createLink && (
          <div>
            <Button href={props.createLink} variant="primary" size="sm">
              {props.createLabel}
            </Button>
          </div>
        )}

        {props.createAction && (
          <div>
            <Button onClick={props.createAction} variant="primary" size="sm">
              {props.createLabel}
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto min-w-max w-full h-fit flex p-1 bg-white shadow-md rounded-lg relative">
        <table
          {...props}
          className="p-2 w-full table-auto border-collapse border-grey-100 rounded-lg"
        >
          <thead className="bg-success-600 p-2 w-auto h-auto">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-white py-2 px-4 text-left select-none"
                    key={header.id}
                  >
                    <div
                      {...{
                        className: 'flex items-center',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                      {{
                        asc: (
                          <Icon
                            icon="bx:chevron-up"
                            width="1.5em"
                            style={{ marginLeft: '2px' }}
                          />
                        ),
                        desc: (
                          <Icon
                            icon="bx:chevron-down"
                            width="1.5em"
                            style={{ marginLeft: '2px' }}
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody >
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-grey-100 odd:bg-grey-50">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={index} className="p-4 text-grey-600 font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {props.meta && props?.data?.length > 0 && <Pagination {...props} />} */}
    </section>
  );
};
