import { Button } from '@fms/atoms';
import { TRoleSingleResponse, TRoleUpdateRequest } from '@fms/entities';
import { ControlledFieldCheckbox } from '@fms/organisms';
import { capitalizeWords } from '@fms/utilities';
import { FC, ReactElement, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Permission = {
  id: string;
  name: string;
  key: string;
  group: string;
  parent: string;
  checked?: boolean;
};
type TPermissionTable = {
  isCollapse: boolean;
  data: TRoleSingleResponse['data'];
  control?: any;
  checked?: boolean;
};

export const PermissionTable: FC<TPermissionTable> = (props): ReactElement => {
  const { control, watch } = useFormContext<TRoleUpdateRequest>();

  const [collapsedGroups, setCollapsedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  const currentPermissions = watch('permissions');

  const checkedPermissionsSet = new Set(currentPermissions?.map((cp) => cp.id));

  // Define the type for the accumulator
  type GroupedPermissions = {
    [key: string]: { [key: string]: (Permission & { checked: boolean })[] };
  };

  // Initialize the groupedPermissions with the correct type
  const groupedPermissions =
    props?.data?.permissions?.reduce<GroupedPermissions>(
      (acc, permission) => {
        const group = permission.group;
        const parent = permission.parent;

        // Determine if the permission is checked by looking up its ID in the set
        const isChecked = checkedPermissionsSet.has(permission.id);

        // Add the checked property to the permission
        const permissionWithChecked = { ...permission, checked: isChecked };

        // Ensure the group and parent keys are initialized in the accumulator
        if (!acc[group]) acc[group] = {};
        if (!acc[group][parent]) acc[group][parent] = [];

        // Push the updated permission into the correct group and parent
        acc[group][parent].push(permissionWithChecked);

        return acc;
      },
      {} as GroupedPermissions // Explicitly cast the initial value to GroupedPermissions
    );

  const handleGroupCollapse = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const sortedGroupKeys =
    groupedPermissions && Object.keys(groupedPermissions).sort();

  return (
    <div className="border border-grey-100 rounded-md shadow-sm flex flex-col gap-y-2">
      {sortedGroupKeys?.map((group) => (
        <div key={group}>
          <div className="flex items-center gap-x-2 px-8 py-2">
            <Button
              type="button"
              onClick={() => handleGroupCollapse(group)}
              className="px-2 rounded text-lg font-medium"
            >
              {collapsedGroups[group] ? '+' : '-'}
            </Button>
            <h3>{group}</h3>
          </div>
          {!collapsedGroups[group] && (
            <section className="flex flex-col gap-y-2 bg-grey-50 py-2 pl-16">
              <div className="w-full">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="font-semibold text-left px-4 py-2">
                        Nama Modul
                      </th>
                      <th className="font-semibold text-left px-4 py-2">
                        Jenis Permission
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {groupedPermissions &&
                      Object.entries(groupedPermissions[group]).map(
                        ([parent, permissions], idx) => (
                          <tr key={idx}>
                            <td className="border-b border-grey-100 px-2 py-2">
                              {capitalizeWords(parent)}
                            </td>
                            <td className="border-b border-grey-100 px-2 py-2 ">
                              <div className="grid grid-flow-row grid-cols-4 gap-2 items-center place-self-center">
                                {permissions.map((permission, index) => (
                                  <div key={permission.key}>
                                    <ControlledFieldCheckbox
                                      name={`permissions.${index}`}
                                      control={control}
                                      value={{
                                        id: permission.id,
                                        name: permission.key,
                                      }}
                                      text={capitalizeWords(permission.name)}
                                      size="sm"
                                      checked={permission.checked}
                                    />
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      ))}
    </div>
  );
};
