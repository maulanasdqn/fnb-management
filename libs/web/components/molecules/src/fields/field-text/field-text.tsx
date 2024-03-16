import { TInput, TInputMolecule } from '@fms/entities';
import { InputText } from '@fms/atoms';
import { ReactElement, forwardRef } from 'react';
import { Fieldset } from '@fms/templates';

export const FieldText = forwardRef<HTMLInputElement, TInput & TInputMolecule>(
  (props, ref): ReactElement => {
    return (
      <Fieldset {...props}>
        <InputText {...props} ref={ref} />
      </Fieldset>
    );
  }
);
