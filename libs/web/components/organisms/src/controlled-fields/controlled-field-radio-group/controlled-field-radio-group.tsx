import { TControlledInputRadioGroup } from '@fms/entities';
import { FieldRadioGroup } from '@fms/molecules';
import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export const ControlledFieldRadioGroup = <T extends FieldValues>(
  props: TControlledInputRadioGroup<T>
): ReactElement => {
  const { field } = useController<T>(props);
  return <FieldRadioGroup {...props} {...field} />;
};
