import { Button } from '@fms/atoms';
import { TRoleSingleResponse } from '@fms/entities';
import { ControlledFieldCheckbox } from '@fms/organisms';
import { FC, ReactElement, useEffect, useState } from 'react';

type Permission = {
  id: string;
  name: string;
  key: string;
  group: string;
  parent: string;
};
type TPermissionTable = {
  isCollapse: boolean;
  data: TRoleSingleResponse['data'];
  control?: any;
  checked?: boolean;
};
const permissionNameMapping: { [key: string]: string } = {
  'CREATE USER': 'Tambah',
  'READ USER': 'Lihat',
  'UPDATE USER': 'Ubah',
  'DELETE USER': 'Hapus',
  'CREATE ROLE': 'Tambah',
  'READ ROLE': 'Lihat',
  'UPDATE ROLE': 'Ubah',
  'DELETE ROLE': 'Hapus',
  'CREATE ORDER': 'Tambah',
  'READ ORDER': 'Lihat',
  'UPDATE ORDER': 'Ubah',
  'DELETE ORDER': 'Hapus',
  'APPROVE ORDER': 'Setujui',
  'CANCEL ORDER': 'Batalkan',
  'READ ALL ORDER': 'Lihat semua',
  'READ ALL ORDER STATUS': 'Lihat Status',
  'CREATE SUPPLIER': 'Tambah',
  'READ SUPPLIER': 'Lihat',
  'UPDATE SUPPLIER': 'Ubah',
  'DELETE SUPPLIER': 'Hapus',
  'CREATE PRODUCT': 'Tambah',
  'READ PRODUCT': 'Lihat',
  'UPDATE PRODUCT': 'Ubah',
  'DELETE PRODUCT': 'Hapus',
  'CREATE PURCHASE': 'Tambah',
  'READ PURCHASE': 'Lihat',
  'UPDATE PURCHASE': 'Ubah',
  'DELETE PURCHASE': 'Hapus',
  'APPROVE PURCHASE': 'Setujui',
  'CANCEL PURCHASE': 'Batalkan',
  'READ ALL PURCHASE': 'Lihat semua',
  'REQUEST PURCHASE': 'Permintaan',
  'CREATE PAYMENT': 'Tambah',
  'READ PAYMENT': 'Lihat',
  'UPDATE PAYMENT': 'Ubah',
  'DELETE PAYMENT': 'Hapus',
  'CREATE PLACE': 'Tambah',
  'READ PLACE': 'Lihat',
  'UPDATE PLACE': 'Ubah',
  'DELETE PLACE': 'Hapus',
  'CREATE INVOICE': 'Tambah',
  'READ INVOICE': 'Lihat',
  'UPDATE INVOICE': 'Ubah',
  'DELETE INVOICE': 'Hapus',
  'CREATE ITEM': 'Tambah',
  'READ ITEM': 'Lihat',
  'UPDATE ITEM': 'Ubah',
  'DELETE ITEM': 'Hapus',
  'CREATE CUSTOMER': 'Tambah',
  'READ CUSTOMER': 'Lihat',
  'UPDATE CUSTOMER': 'Ubah',
  'DELETE CUSTOMER': 'Hapus',
  'CREATE RECIPE': 'Tambah',
  'READ RECIPE': 'Lihat',
  'UPDATE RECIPE': 'Ubah',
  'DELETE RECIPE': 'Hapus',
  'CREATE INGREDIENT': 'Tambah',
  'READ INGREDIENT': 'Lihat',
  'UPDATE INGREDIENT': 'Ubah',
  'DELETE INGREDIENT': 'Hapus',
  'CREATE UNIT TYPE': 'Tambah',
  'READ UNIT TYPE': 'Lihat',
  'UPDATE UNIT TYPE': 'Ubah',
  'DELETE UNIT TYPE': 'Hapus',
  'CREATE TRANSACTION': 'Tambah',
  'READ TRANSACTION': 'Lihat',
  'UPDATE TRANSACTION': 'Ubah',
  'DELETE TRANSACTION': 'Hapus',
  'READ DASHBOARD TRANSACTION': 'Lihat',
};
export const PermissionTable: FC<TPermissionTable> = (props): ReactElement => {
  const [collapsedGroups, setCollapsedGroups] = useState<{
    [key: string]: boolean;
  }>({});
  const groupedPermissions = props?.data?.permissions?.reduce(
    (
      acc: { [key: string]: { [key: string]: Permission[] } },
      permission: Permission
    ) => {
      const group = permission.group;
      const parent = permission.parent;
      if (!acc[group]) acc[group] = {};
      if (!acc[group][parent]) acc[group][parent] = [];
      acc[group][parent].push(permission);
      return acc;
    },
    {}
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
                        ([parent, permissions], index) => (
                          <tr key={index}>
                            <td className="border-b border-grey-100 px-2 py-2 lowercase">
                              {parent}
                            </td>
                            <td className="border-b border-grey-100 px-2 py-2 ">
                              <div className="grid grid-flow-row grid-cols-4 gap-2 items-center place-self-center">
                                {permissions.map((permission) => (
                                  <div key={permission.key}>
                                    <ControlledFieldCheckbox
                                      name={`permissions.${permission.key}`}
                                      control={props.control}
                                      label={
                                        permissionNameMapping[
                                          permission.name
                                        ] || permission.name
                                      }
                                      size="sm"
                                      checked={props.checked}
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
