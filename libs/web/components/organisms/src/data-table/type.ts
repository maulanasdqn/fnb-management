import { TMetaResponse } from '@fms/entities';
import { ColumnDef, PaginationState, Updater } from '@tanstack/react-table';
import { ChangeEventHandler, MouseEventHandler } from 'react';
export type TDataTable<T extends Record<string, unknown>> = {
  data: T[];
  meta?: TMetaResponse;
  columns: ColumnDef<T>[];
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
  setPagination?: (updater: Updater<PaginationState>) => void;
  createLink?: string;
  createLabel?: string;
  createAction?: MouseEventHandler<HTMLButtonElement>;
  searchBox?: boolean;
};
