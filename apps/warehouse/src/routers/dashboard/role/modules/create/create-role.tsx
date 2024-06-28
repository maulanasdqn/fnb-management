import { Button, ToastWrapper } from '@fms/atoms';
import { roleCreateSchema, TRoleCreateRequest } from '@fms/entities';
import {
  ControlledFieldCheckbox,
  ControlledFieldText,
  PermissionsTable,
} from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { capitalizeWords } from '@fms/utilities';
import { userService } from '@fms/web-services';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnDef } from '@tanstack/react-table';
import { FC, ReactElement, useMemo, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Permission {
  id: string;
  key: string;
  name: string;
  checked?: boolean;
}

type GroupedPermissions = {
  [key: string]: { [key: string]: (Permission & { checked?: boolean })[] };
};

export const CreateRole: FC = (): ReactElement => {
  const [collapsedGroups, setCollapsedGroups] = useState<{
    [key: string]: boolean;
  }>({});
  const navigate = useNavigate();
  const userData = userService.getUserData();

  const { mutate, isPending } = trpc.role.create.useMutation();
  const methods = useForm<TRoleCreateRequest>({
    resolver: zodResolver(roleCreateSchema),
    mode: 'all',
  });

  const onSubmit = methods.handleSubmit((data) => {
    const formattedData = {
      name: data.name,
      permissionIds: data.permissionIds || [],
    };

    console.log(formattedData);

    mutate(formattedData, {
      onSuccess: () => {
        toast.success('Role Berhasil dibuat');
        setTimeout(() => {
          navigate('/dashboard/role');
        }, 2000);
      },
    });
  });

  const control = methods.control;
  const watchPermissions = useWatch({ name: 'permissionIds', control }) || [];

  const handlePermissionChange = (permissionId: string) => {
    const currentPermissions = watchPermissions;
    const updatedPermissions = [...currentPermissions];

    if (updatedPermissions.includes(permissionId)) {
      updatedPermissions.splice(updatedPermissions.indexOf(permissionId), 1);
    } else {
      updatedPermissions.push(permissionId);
    }

    methods.setValue('permissionIds', updatedPermissions);
  };

  const columns: ColumnDef<{
    id: string;
    parent: string;
    permissions: Permission[];
  }>[] = useMemo(
    () => [
      {
        header: 'Nama Modul',
        accessorKey: 'parent',
        cell: ({ row }) => capitalizeWords(row.original.parent),
      },
      {
        header: 'Jenis Permission',
        accessorKey: 'permissions',
        cell: ({ row }) => (
          <div className="grid grid-flow-row grid-cols-4 gap-2 items-center place-self-center">
            {row.original.permissions.map((permission, index) => (
              <div key={permission.id}>
                <ControlledFieldCheckbox
                  name={`permissionIds.${index}`}
                  control={methods.control}
                  value={{
                    id: permission.id,
                    name: permission.key,
                  }}
                  text={capitalizeWords(permission.name)}
                  size="sm"
                  checked={watchPermissions.includes(permission.id)}
                  onChange={() => handlePermissionChange(permission.id)}
                />
              </div>
            ))}
          </div>
        ),
      },
    ],
    [methods.control, watchPermissions]
  );

  const groupedPermissions =
    userData.role?.permissions.reduce<GroupedPermissions>((acc, permission) => {
      const group = permission.group;
      const parent = permission.parent;

      if (!acc[group]) acc[group] = {};
      if (!acc[group][parent]) acc[group][parent] = [];
      acc[group][parent].push(permission);
      return acc;
    }, {} as GroupedPermissions);

  const handleGroupCollapse = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const sortedGroupKeys =
    groupedPermissions && Object.keys(groupedPermissions).sort();

  return (
    <section className="w-full min-h-screen">
      <ToastWrapper />
      <div>
        <p className="text-grey-400">
          Roles List / <span className="text-success-600">Tambah</span>
        </p>
        <h1 className="text-2xl font-bold my-4">Tambah Role</h1>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-y-4 w-full h-auto bg-white rounded-md p-4"
        >
          <div>
            <ControlledFieldText
              name="name"
              control={methods.control}
              label="Nama Role"
              size="sm"
              status={methods.formState.errors.name ? 'error' : 'default'}
              message={methods.formState.errors.name?.message}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="mb-4">Role Permission :</h2>
            <PermissionsTable
              control={methods.control}
              groupKeys={sortedGroupKeys}
              columns={columns}
              groupedPermissions={groupedPermissions}
              handleGroupCollapse={handleGroupCollapse}
              collapsedGroups={collapsedGroups}
            />
          </div>
          <div className="mt-4 w-full flex gap-x-3 place-content-end col-span-2">
            <Button
              type="submit"
              variant="primary"
              variantType="outline"
              size="sm"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              state={isPending ? 'loading' : 'default'}
              variant="primary"
              variantType="solid"
              size="sm"
              disabled={isPending}
            >
              Simpan
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
