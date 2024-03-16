import { useId, forwardRef } from 'react';
import { TInput, className } from '@fms/entities';

export const InputText = forwardRef<HTMLInputElement, TInput>(
  ({ size = 'sm', status = 'default', placeholder, ...props }, ref) => {
    const id = useId();
    return (
      <input
        {...props}
        ref={ref}
        id={id}
        className={className({ size, status })}
        placeholder={placeholder}
      />
    );
  }
);
