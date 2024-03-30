import { TControlledInputSpecial } from '@fms/entities';
import { FieldRadio } from '@fms/molecules';
import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldRadio = <T extends FieldValues>(
  props: TControlledInputSpecial<T>
): ReactElement => {
  const { field } = useController<T>(props);
  return <FieldRadio {...props} {...field} />;
};
