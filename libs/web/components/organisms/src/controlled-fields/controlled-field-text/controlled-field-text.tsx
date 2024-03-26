import { TControlledInput } from '@fms/entities';
import { FieldText } from '@fms/molecules';
import { ReactElement, forwardRef } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldText = <T extends FieldValues>(
  props: TControlledInput<T>
): ReactElement => {
  const { field } = useController<T>(props);
  return <FieldText {...props} {...field} />;
};
