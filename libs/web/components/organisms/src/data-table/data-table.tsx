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
    <section className="rounded-md overflow-x-auto h-fit overflow-y-hidden w-full gap-y-4 flex flex-col">
      <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-4 md:items-center sticky z-10 w-full">
        <div className="w-4/12">
          <InputText
            className="w-full"
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
      <div className="text-sm min-w-max w-full h-fit flex shadow-md rounded-lg relative">
        <table
          {...props}
          className="p-2 w-full table-auto border-collapse border-grey-100 rounded-lg"
        >
          <thead className="bg-primary-700 p-2 w-auto h-auto rounded-t-md overflow-hidden">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    className={`text-white py-3 px-4 text-left select-none ${idx === 0 ? 'rounded-tl-md' : ''} ${idx === headerGroup.headers.length - 1 ? 'rounded-tr-md' : ''}`}
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
          <tbody className="">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-grey-100 odd:bg-grey-50">
                {row.getVisibleCells().map((cell, index) => (
                  <td key={index} className="px-4 py-2 text-grey-600 font-medium">
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
