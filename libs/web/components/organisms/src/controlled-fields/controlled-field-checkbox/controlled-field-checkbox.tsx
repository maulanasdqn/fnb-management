import { TControlledInputSpecial } from '@fms/entities';
import { FieldCheckbox } from '@fms/molecules';
import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldCheckbox = <T extends FieldValues>(
  props: Omit<TControlledInputSpecial<T>, 'onChange' | 'value'> & {
    onChange?: (value?: { name: string; id: string }) => void;
    value?: { name: string; id: string };
  }
): ReactElement => {
  const { field } = useController<T>(props);
  return (
    <FieldCheckbox
      {...props}
      {...field}
      onChange={() => field.onChange?.(props.value)}
    />
  );
};
