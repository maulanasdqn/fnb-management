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
  const handleChange = () => {
    field.onChange?.(props.value);
    props.onChange?.(props.value);
  };
  return (
    <FieldCheckbox
      {...props}
      {...field}
      checked={props.checked}
      onChange={handleChange}
    />
  );
};
