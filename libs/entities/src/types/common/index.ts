import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { AxiosError } from 'axios';
import { z } from 'zod';
import {
  metaResponseSchema,
  queryParamsSchema,
} from '../../validation-schemas';

export type TQueryParams = z.infer<typeof queryParamsSchema>;

export type TBase = {
  id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type TCommonObject = {
  id: string;
  name: string;
};

export type TMetaResponse = z.infer<typeof metaResponseSchema>;

export type TBaseResponse<T = null | undefined> = {
  data?: T;
  meta?: TMetaResponse;
  message?: string;
};

export type TResponse<T = null | undefined> = {
  data?: T;
  meta?: TMetaResponse;
  message?: string;
};

export type TPaginationQueryParams = {
  page?: string;
  perPage?: string;
  search?: string;
};

export type TMetaErrorResponse = AxiosError<
  Omit<TBaseResponse<null>, 'meta'> & { errors?: Array<{ message: string }> }
>;

export type TSize = 'sm' | 'md' | 'lg';

export type TVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export type TVariantType = 'solid' | 'outline';

export type TState = 'default' | 'loading';

export type TInputExtend = {
  size?: TSize;
  status?: Omit<TVariant, 'primary' | 'secondary'>;
};

export type TInput = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> &
  TInputExtend;

export type TInputSpecial = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type' | 'placeholder'
> &
  TInputExtend;

export type TTextArea = Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'size'
> &
  TInputExtend;

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Omit<TVariant, 'default' | 'info'>;
  size?: TSize;
  variantType?: TVariantType;
  href?: string;
  state?: TState;
};

export type TInputMolecule = {
  label?: string;
  message?: string;
  text?: string;
};

export type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  disabled?: boolean;
} & TInputExtend;

export type TControlledInput<T extends FieldValues> = UseControllerProps<T> &
  TInput &
  TInputMolecule;

export type TControlledSelect<T extends FieldValues> = UseControllerProps<T> &
  TSelect &
  TInputMolecule;

export type TControlledInputSpecial<T extends FieldValues> =
  UseControllerProps<T> & TInputSpecial & TInputMolecule;

export type TControlledInputRadioGroup<T extends FieldValues> =
  UseControllerProps<T> &
    Omit<
      TInputSpecial &
        TInputMolecule & {
          options: TOption[];
        },
      'onChange'
    > & {
      onChange?: (value?: string | number | boolean) => void;
    };

export type TControlledTextArea<T extends FieldValues> = UseControllerProps<T> &
  TTextArea &
  TInputMolecule;

export type TMessage = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  TInputExtend;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TFieldSet = Omit<DetailedHTMLProps<any, any>, 'size' | 'type'> &
  TInputExtend &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export type TForm = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export type TSelectOption<T = string | number | boolean | unknown> = {
  label: string;
  value: T;
};

export type TSelect = TInputExtend & {
  options?: TSelectOption[];
  disabled?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  onChange?: (value: string) => void;
  message?: string;
  value?: string | string[] | null | number | number[] | null;
  name?: string;
};
export type TPieChart = {
  title: string;
  type: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: [];
      backgroundColor: string[];
    }>;
  };
  hoverOffset: number;
};
export type TLineChart = {
  chartType:
    | 'januari'
    | 'februari'
    | 'maret'
    | 'april'
    | 'mei'
    | 'juni'
    | 'juli'
    | 'agustus'
    | 'september'
    | 'oktober'
    | 'november'
    | 'desember';
  title: string;
  data?: {
    labels: string[];
    datasets: Array<{
      label: string;
      backgroundColor: string;
      borderColor: string;
      pointBackgroundColor: string;
      pointBorderColor: string;
      borderWidth: number;
      data: number[];
      tention: number;
    }>;
  };
};

export type TOption = { value: string; label: string; additional?: string };

export * from './style';
