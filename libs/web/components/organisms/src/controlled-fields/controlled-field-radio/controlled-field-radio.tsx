import { TControlledInput } from "@fms/entities";
import { FieldRadio } from "@fms/molecules";
import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";

export const ControlledFieldRadio = <T extends FieldValues>(
    props: TControlledInput<T>
): ReactElement => {
    const { field } = useController<T>(props);
    return <FieldRadio {...props} {...field} />;
}