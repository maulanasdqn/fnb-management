import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button, Pagination } from '@fms/atoms';
import { TDataTable } from './type';
import { TMetaResponse } from '@fms/entities';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'radash';

export const DataTable = <T extends Record<string, unknown>>(
  props: TDataTable<T>
): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );
  const memoizeColumns = useMemo(() => props.columns, [props.columns]);
  const memoizeData = useMemo(() => props.data || [], [props.data]);

  const table = useReactTable({
    data: memoizeData,
    columns: memoizeColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: false,
    manualPagination: true,
  });
  useEffect(() => {
    const search = searchParams.get('search');
    if (search !== null && search !== 'null') {
      setSearchValue(search);
    }
  }, [searchParams]);
  return (
    <div className="w-full h-full bg-white p-4 mt-10 rounded-lg">
      <div className="flex items-center gap-x-4">
        <input
          value={searchValue}
          onChange={(e) => {
            debounce({ delay: 500 }, () => props?.handleSearch?.(e));
            setSearchParams({
              search: e.target.value,
              page: String(searchParams.get('page')),
              perPage: String(searchParams.get('perPage')),
            });
            setSearchValue(e.target.value);
          }}
          className="w-fit my-2 p-2 border-grey-100 border text-grey-400 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 bg-white placeholder-grey-400 rounded-lg"
          placeholder="Search"
          type="search"
        />
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

      <div className="relative flex flex-col no-scrollbar w-full h-full overflow-scroll text-grey-700 bg-white shadow-md bg-clip-border rounded-xl">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="p-4 bg-primary text-white"
                  >
                    <div
                      {...{
                        className: 'flex items-center gap-x-1',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <p className="block font-sans text-sm antialiased font-semibold leading-none">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </p>
                      )}
                      {{
                        asc: (
                          <Icon className="text-white" icon="lucide:sort-asc" />
                        ),
                        desc: (
                          <Icon
                            className="text-white"
                            icon="lucide:sort-desc"
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 border-b border-grey-100">
                    <div className="block font-sans text-sm antialiased font-normal leading-normal text-blue-grey-900">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {props.meta && <Pagination meta={props.meta as TMetaResponse} />}
      </div>
    </div>
  );
};
