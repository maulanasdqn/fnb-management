import { InputRadio } from '@fms/atoms';
import { TInputSpecial } from '@fms/entities';
import { Fieldset } from '@fms/templates';
import { FC, ReactElement } from 'react';

export const FieldRadio: FC<TInputSpecial> = (props): ReactElement => {
  return (
    <Fieldset type="radio" {...props}>
      <InputRadio {...props} />
    </Fieldset>
  );
};