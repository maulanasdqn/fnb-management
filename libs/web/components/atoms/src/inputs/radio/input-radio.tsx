import { TInputSpecial } from '@fms/entities';
import { FC, useId } from 'react';
export const InputRadio: FC<TInputSpecial> = ({
    size = 'sm',
    status = 'primary',
    ...props
  }) => {
    const id = useId();
    return (
      <input
        {...props}
        data-testid={'input-radio'}
        id={id}
        onChange={() => console.log({...props})}
        type={'radio'}
        className="w-4 h-4 text-primary checked:bg-primary bg-white border-grey focus:ring-none focus:outline-none"
      />
    );
  };