import { Breadcrumbs, Button, ToastWrapper } from '@fms/atoms';
import { TUserUpdateRequest } from '@fms/entities';
import { ControlledFieldSelect, ControlledFieldText } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

export const schema = z.object({
  fullname: z
    .string({ required_error: 'Nama lengkap harus diisi' })
    .min(1, { message: 'Nama lengkap harus diisi' }),
  username: z
    .string({ required_error: 'Username harus diisi' })
    .min(1, { message: 'Username harus diisi' }),
//   password: z
//     .string({ required_error: 'Password tidak boleh kosong' })
//     .min(1, { message: 'Password tidak boleh kosong' }),
  roleId: z
    .string({ required_error: 'Role harus diisi' })
    .min(1, { message: 'Role harus diisi' }),
  avatar: z.string().optional(),
});
export const UpdateUser: FC = (): ReactElement => {
  const { mutate, isPending } = trpc.user.update.useMutation();
  const params = useParams();
  const { data: userData } = trpc.user.detail.useQuery({
    id: params.id as string,
  });
  const { data: roleData } = trpc.role.findMany.useQuery();
  const roleType = roleData?.data?.map((role) => ({
    label: role.name,
    value: role.id,
  }));
  const navigate = useNavigate();
  const breadcrumbsItem = [
    { name: 'Update Data', path: '/dashboard/:id/Edit' },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TUserUpdateRequest>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
        id: params.id as string,
        fullname: data.fullname,
        username: data.username,
        roleId: data.roleId,
        avatar: data.avatar
    }, {
      onSuccess: () => {
        toast.success('Behasil memperbarui user');
        setTimeout(() => {
          navigate('/dashboard/user');
        }, 1000);
      },
    });
  });
  useEffect(() => {
    reset(userData?.data as TUserUpdateRequest);
  }, [userData, reset]);
  return (
    <section className="w-full py-4 bg-white shadow-md rounded px-8 h-5/6 ">
      <ToastWrapper />
      <div className="flex gap-x-1">
        <h1 className="text-grey">
          User <span className="text-grey-400"> {'/'} </span>
        </h1>
        <Breadcrumbs items={breadcrumbsItem} />
      </div>
      <div className="flex items-center justify-center w-full h-full mt-16">
        <form className="w-full" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4 w-5/6 mx-auto">
            <ControlledFieldText
              type="text"
              status={errors.fullname ? 'error' : 'default'}
              message={errors.fullname?.message}
              label="Nama Lengkap"
              name="fullname"
              control={control}
              required
            />
            <ControlledFieldSelect
              name="roleId"
              control={control}
              label="Pilih Role"
              options={roleType}
              required
              status={errors.roleId ? 'error' : 'default'}
              message={errors.roleId?.message}
            />

            <ControlledFieldText
              status={errors.username ? 'error' : 'default'}
              message={errors.username?.message}
              type="text"
              label="Username"
              name="username"
              control={control}
              required
            />
            <ControlledFieldText
              status={errors.username ? 'error' : 'default'}
              message={errors.username?.message}
              type="text"
              label="Foto Profile"
              name="avatar"
              control={control}
            />
            <div className="mt-4 w-full flex gap-x-3 place-content-end col-span-2">
              <Button
                type="button"
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
                disabled={!isValid || isPending}
              >
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
