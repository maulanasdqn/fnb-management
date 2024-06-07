import { FC, ReactElement, useId } from 'react';
import { clsx } from 'clsx';
import { TInputSpecial } from '@fms/entities';

export const InputCheckbox: FC<
  Omit<TInputSpecial, 'onChange'> & { onChange?: (e: string) => void }
> = ({ size = 'sm', status = 'default', ...props }): ReactElement => {
  const id = useId();
  const className = clsx(
    'focus:ring-grey-800 bg-white rounded-full accent-primary',
    {
      'w-3 h-3': size === 'sm',
      'w-5 h-5': size === 'md',
      'w-6 h-6': size === 'lg',
    },
    {
      'bg-primary-2': status === 'default',
      'bg-error': status === 'error',
      'bg-warning': status === 'warning',
      'bg-success': status === 'success',
    }
  );
  return (
    <input
      {...props}
      data-testid={'input-checkbox'}
      id={id}
      type={'checkbox'}
      className={className}
      onChange={(e) => props.onChange?.(e?.target?.value)}
    />
  );
};
