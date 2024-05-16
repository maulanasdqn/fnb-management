import { InputCheckbox } from '@fms/atoms';
import { TInputSpecial } from '@fms/entities';
import { Fieldset } from '@fms/templates';
import { FC, ReactElement } from 'react';

export const FieldCheckbox: FC<TInputSpecial> = (props): ReactElement => {
  return (
    <Fieldset type="checkbox" {...props}>
      <InputCheckbox {...props} />
    </Fieldset>
  );
};
