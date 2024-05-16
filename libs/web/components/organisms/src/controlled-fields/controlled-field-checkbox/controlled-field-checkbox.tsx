import { TControlledInputSpecial } from '@fms/entities';
import { FieldCheckbox } from '@fms/molecules';
import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldCheckbox = <T extends FieldValues>(
  props: TControlledInputSpecial<T>
): ReactElement => {
  const { field } = useController<T>(props);
  return <FieldCheckbox {...props} {...field} />;
};
