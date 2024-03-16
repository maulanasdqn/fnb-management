import { TControlledInput } from '@fms/entities';
import { FieldText } from '@fms/molecules';
import { ReactElement, forwardRef } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldText = forwardRef<
  HTMLInputElement,
  TControlledInput<FieldValues>
>((props: TControlledInput<FieldValues>, ref): ReactElement => {
  const { field } = useController<FieldValues>(props);
  return <FieldText {...props} {...field} ref={ref} />;
});
