import { ColumnDef } from '@tanstack/react-table';
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
} from 'react';

export type TTable<T extends Record<string, unknown>> = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  meta?: {
    page: number;
    pageSize: number;
    total: number;
  };
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
  createLink?: string;
  createLabel?: string;
  data: Array<T>;
  columns: ColumnDef<T>[];
  createAction?: MouseEventHandler<HTMLButtonElement>;
};
