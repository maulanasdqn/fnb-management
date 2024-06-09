import { Button } from '@fms/atoms';
import { TRoleUpdateRequest, roleUpdateSchema } from '@fms/entities';
import { ControlledFieldText } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { FC, ReactElement, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionTable } from '../permission-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { userService } from '@fms/web-services';

export const EditRole: FC = (): ReactElement => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isPending } = trpc.role.findOne.useQuery({
    id: params.id as string,
  });

  const methods = useForm<TRoleUpdateRequest>({
    resolver: zodResolver(roleUpdateSchema),
    mode: 'all',
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  const userData = userService.getUserData();

  useEffect(() => {
    methods.reset({
      id: userData?.role.id,
      name: userData?.role?.name,
      permissions: userData?.role?.permissions?.map((x) => ({
        id: x.id,
        name: x.name,
      })),
    });
  }, [data, methods.reset]);

  return (
    <section className="w-full min-h-screen">
      <div>
        <p className="text-grey-400">
          Roles List / <span className="text-success-600">Edit</span>
        </p>
        <h1 className="text-2xl font-bold my-4">Edit Role</h1>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className=" flex flex-col gap-y-4 w-full h-auto bg-white rounded-md p-4"
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
            <PermissionTable
              data={data?.data}
              control={methods.control}
              isCollapse={false}
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
