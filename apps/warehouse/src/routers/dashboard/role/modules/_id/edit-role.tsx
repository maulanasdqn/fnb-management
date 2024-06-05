import { Button } from '@fms/atoms';
import { TRole } from '@fms/entities';
import {
  ControlledFieldCheckbox,
  ControlledFieldSelect,
  DataTable,
} from '@fms/organisms';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

export const EditRole: FC = (): ReactElement => {
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const roles = [
    { label: 'Super Admin', value: 'super admin' },
    { label: 'Admin', value: 'admin' },
  ];
  const { control } = useForm();
  const dataPermission = [
    {
      id: 1,
      name: 'Employee',
      permissions: ['Aksi', 'Lihat', 'Tambah', 'Ubah'],
    },
    {
      id: 2,
      name: 'Role',
      permissions: ['Aksi', 'Lihat', 'Tambah', 'Ubah'],
    },
    {
      id: 3,
      name: 'Warehouse',
      permissions: ['Aksi', 'Lihat', 'Tambah', 'Ubah'],
    },
  ];

  const handleIsColapse = (): void => setIsCollapse(!isCollapse);
  const permissionsArray = dataPermission.map((item) => item.permissions);
  const modulsArray = dataPermission.map((item) => item.name);
  return (
    <section className="w-full min-h-screen">
      <div>
        <p className="text-grey-400">
          Roles List / <span className="text-success-600">Edit</span>
        </p>
        <h1 className="text-2xl font-bold my-4">Edit Role</h1>
      </div>
      <form className=" flex flex-col gap-y-4 w-full h-auto bg-white rounded-md p-4">
        <div>
          <ControlledFieldSelect
            name="roles"
            options={roles}
            control={control}
            label="Nama Role"
            size="sm"
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="mb-4">Role Permission :</h2>
          <div className="border border-grey-100 rounded-md shadow-sm flex flex-col gap-y-2">
            <div className="flex items-center gap-x-2 px-8 py-2">
              {isCollapse ? (
                <Button
                  type="button"
                  onClick={handleIsColapse}
                  className="px-2 rounded text-lg font-medium"
                >
                  +
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleIsColapse}
                  className="px-2 rounded text-lg font-medium"
                >
                  -
                </Button>
              )}
              <h3>1: User Management - Employee</h3>
            </div>
            {!isCollapse && (
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
                      {modulsArray.map((item, index) => (
                        <tr key={index}>
                          <td className="border-b border-grey-100 px-4 py-2">
                            {item}
                          </td>
                          <td className="border-b border-grey-100 px-4 py-2">
                            <div className="flex flex-wrap gap-x-8">
                              {permissionsArray.map((permission, idx) => (
                                <div>
                                  <ControlledFieldCheckbox
                                    key={idx}
                                    name={`permission-${idx}`}
                                    control={control}
                                    label={permission[idx]}
                                    size="md"
                                  />
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};
