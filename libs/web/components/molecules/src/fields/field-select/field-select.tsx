import { InputSelect } from "@fms/atoms";
import { TInputMolecule, TSelect } from "@fms/entities";
import { Fieldset } from "@fms/templates";
import { FC, ReactElement } from "react";

export const FieldSelect: FC<TSelect & TInputMolecule> = (
    props
  ): ReactElement => {
    return (
      <Fieldset {...props}>
        <InputSelect {...props} />
      </Fieldset>
    );
  };