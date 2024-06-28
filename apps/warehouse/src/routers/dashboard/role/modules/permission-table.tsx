import { Button } from '@fms/atoms';
import { TRoleSingleResponse, TRoleUpdateRequest } from '@fms/entities';
import { ControlledFieldCheckbox } from '@fms/organisms';
import { capitalizeWords } from '@fms/utilities';
import { userService } from '@fms/web-services';
import { FC, ReactElement, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

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
  const { control, setValue } = useFormContext<TRoleUpdateRequest>();

  const [collapsedGroups, setCollapsedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  const currentPermissions = useWatch({ control, name: 'permissionIds' }) || [];
  const checkedPermissionsSet = new Set(currentPermissions);

  type GroupedPermissions = {
    [key: string]: { [key: string]: (Permission & { checked: boolean })[] };
  };

  const userData = userService.getUserData();
  const rolePermissions = new Set(
    props.data?.permissions?.map((perm: Permission) => perm.id) || []
  );

  const groupedPermissions =
    userData.role?.permissions.reduce<GroupedPermissions>((acc, permission) => {
      const group = permission.group;
      const parent = permission.parent;

      const isChecked =
        rolePermissions.has(permission.id) &&
        checkedPermissionsSet.has(permission.id);

      const permissionWithChecked = { ...permission, checked: isChecked };

      if (!acc[group]) acc[group] = {};
      if (!acc[group][parent]) acc[group][parent] = [];

      acc[group][parent].push(permissionWithChecked);

      return acc;
    }, {} as GroupedPermissions);

  const handleGroupCollapse = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const handlePermissionChange = (permission: Permission) => {
    const updatedPermissions = [...currentPermissions];

    if (updatedPermissions.includes(permission.id)) {
      updatedPermissions.splice(updatedPermissions.indexOf(permission.id), 1);
    } else {
      updatedPermissions.push(permission.id);
    }

    setValue('permissionIds', updatedPermissions);
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
                            <td className="border-b border-grey-100 px-2 py-2">
                              <div className="grid grid-flow-row grid-cols-4 gap-2 items-center place-self-center">
                                {permissions.map((permission, index) => (
                                  <div key={permission.id}>
                                    <ControlledFieldCheckbox
                                      name={`permissionIds.${index}`}
                                      control={control}
                                      value={{
                                        id: permission.id,
                                        name: permission.key,
                                      }}
                                      text={capitalizeWords(permission.name)}
                                      size="sm"
                                      checked={
                                        permission.checked ||
                                        currentPermissions.includes(
                                          permission.id
                                        )
                                      }
                                      onChange={() =>
                                        handlePermissionChange(permission)
                                      }
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
