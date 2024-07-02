import { InputRadio } from '@fms/atoms';
import { TInputMolecule, TInputSpecial, TRadioOption } from '@fms/entities';
import { Fieldset } from '@fms/templates';
import { clsx } from 'clsx';
import { ReactElement, forwardRef } from 'react';

export const FieldRadioGroup = forwardRef<
  HTMLInputElement,
  Omit<TInputSpecial & TInputMolecule & {options: TRadioOption[];},'onChange'> & {
    onChange?: (value?: {id:string; name:string;}| number | boolean) => void;
    value: {id:string; name:string;};
  }
>((props, ref): ReactElement => {
  const className = clsx(
    'flex items-center gap-x-2 w-full justify-between border-b border-grey-100 py-2',
    {
      'text-grey': !props.disabled,
      'text-primary': props.disabled,
    }
  );
  return (
    <Fieldset {...props}>
      {props.options.map((option, key) => (
        <label key={key} className={className}>
          <span className="text-grey-700">{option.label}</span>
          <div className="flex items-center gap-x-2">
            <span>{option.additional}</span>
            <InputRadio
              {...props}
              ref={ref}
              checked={props?.value?.id === option.value.id}
              onChange={() =>  props?.onChange?.(option.value)}
            />
          </div>
        </label>
      ))}
    </Fieldset>
  );
});
