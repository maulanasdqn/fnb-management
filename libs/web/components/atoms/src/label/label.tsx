import { FC, ReactElement } from 'react';
import { clsx } from 'clsx';
import { TLabel } from '@fms/entities';

export const Label: FC<TLabel> = (props): ReactElement => {
  const className = clsx(
    'flex gap-x-1 text-grey-400 select-none font-medium',
    {
      'text-xs': props.size === 'sm',
      'text-sm': props.size === 'md',
      'text-md': props.size === 'lg',
    },
    {
      'text-grey-300 cursor-not-allowed opacity-50': props.disabled,
    },
    props.className
  );

  return (
    <label
      id={props.id}
      data-testid="label"
      htmlFor={props.htmlFor}
      className={className}
      {...props}
    >
      {props.children}
      {props.required && (
        <span data-testid="required" className="text-error">
          *
        </span>
      )}
    </label>
  );
};
