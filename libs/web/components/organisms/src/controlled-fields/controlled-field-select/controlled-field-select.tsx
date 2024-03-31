import { TControlledSelect } from '@fms/entities';
import { FieldSelect } from '@fms/molecules';
import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldSelect = <T extends FieldValues>(
  props: TControlledSelect<T>
): ReactElement => {
  const { field } = useController<T>(props);
  return <FieldSelect {...field} {...props} />;
};