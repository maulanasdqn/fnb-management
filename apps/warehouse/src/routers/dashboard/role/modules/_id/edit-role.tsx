import { Button } from '@fms/atoms';
import { TRoleUpdateRequest } from '@fms/entities';
import { ControlledFieldSelect } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { FC, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionTable } from '../permission-table';

export const EditRole: FC = (): ReactElement => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, isPending } = trpc.role.findOne.useQuery({
    id: params.id as string,
  });

  const roles = [
    { label: data?.data?.name as string, value: data?.data?.name as string },
  ];
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm<TRoleUpdateRequest>({
    mode: 'all',
  });

  useEffect(() => {
    reset(data?.data as unknown as TRoleUpdateRequest);
  }, [data, reset]);

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
            name="name"
            options={roles}
            control={control}
            label="Nama Role"
            size="sm"
            status={errors?.name ? 'error' : 'success'}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="mb-4">Role Permission :</h2>
          <PermissionTable
            data={data?.data}
            control={control}
            isCollapse={false}
            checked={watch('permissions') ? true : false}
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
            disabled={!isValid || isPending}
          >
            Simpan
          </Button>
        </div>
      </form>
    </section>
  );
};
