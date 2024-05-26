import { ColumnDef, PaginationState, Updater } from '@tanstack/react-table';
import {
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
export type TDataTable<T extends Record<string, unknown>> = {
  data: T[];
  meta?: {
    total: number;
    perPage: number;
    page: number;
    prev: boolean;
    next: boolean;
  };
  columns: ColumnDef<T>[];
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
  setPagination?: (updater: Updater<PaginationState>) => void;
  createLink?: string;
  createLabel?: string;
  createAction?: MouseEventHandler<HTMLButtonElement>;
  searchBox?: boolean;
};
