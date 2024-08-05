import { FC, ReactElement, useState } from 'react';
import { Button, Breadcrumbs, ToastWrapper } from '@fms/atoms';
import { ControlledFieldSelect, ControlledFieldText } from '@fms/organisms';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@fms/trpc-client';
import { toast } from 'react-toastify';
import { TIngredientCreateRequest } from '@fms/entities';

export const schema = z.object({
  name: z
    .string({ required_error: 'Nama Inggredient harus Diisi' })
    .min(1, { message: 'Nama Inggredient harus Diisi' }),
  price: z
    .string({ required_error: 'Harga Inggredient harus Diisi' })
    .min(1, { message: 'Harga Inggredient harus Diisi' }),
  amount: z
    .string({ required_error: 'Jumlah Inggredient harus Diisi' })
    .min(1, { message: 'Jumlah Inggredient harus Diisi' }),
  unitTypeId: z
    .string({ required_error: 'Satuan Inggredient harus Diisi' })
    .min(1, { message: 'Satuan Inggredient harus Diisi' }),
});

export const CreateInggredient: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const { mutate, isPending } = trpc.ingredient.create.useMutation();

  const unitType = [
    {
      label: 'gram',
      value: '53eea5f3-4a5a-4bed-aad4-c350703bde6b',
    },
    {
      label: 'kilogram',
      value: '65f90004-6219-4ef1-8631-a0c8c36c2a2c',
    },
    {
      label: 'mililiter',
      value: "5a3b67fc-5965-4488-a51b-27165aba33f5"
    },
    {
      label: "liter",
      value: "77332082-ae00-47a7-8275-c9cbde30d105"
    },
  ];

  const navigate = useNavigate();
  const breadcrumbsItem = [
    { name: 'Create Data', path: '/dashboard/ingredient/create' },
  ];
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TIngredientCreateRequest>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        name: data?.name,
        price: Number(data?.price),
        amount: Number(data?.amount),
        unitTypeId: data?.unitTypeId,
      },
      {
        onSuccess: () => {
          toast.success('Create Ingredient Success');
          setTimeout(() => {
            navigate('/dashboard/ingredient');
          }, 1000);
        },
      }
    );
  });
  return (
    <section className="w-full py-4 bg-white shadow-md rounded px-8 h-5/6 ">
      <ToastWrapper />
      <div className="flex gap-x-1">
        <h1 className="text-grey">
          Product <span className="text-grey-400"> {'/'} </span>
        </h1>
        <Breadcrumbs items={breadcrumbsItem} />
      </div>
      <div className="flex items-center justify-center w-full h-full mt-16">
        <form className="w-full" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4 w-5/6 mx-auto">
            <ControlledFieldText
              type="text"
              status={errors.name ? 'error' : 'default'}
              message={errors.name?.message}
              label="Nama Inggredient"
              name="name"
              control={control}
              required
            />
            <ControlledFieldText
              status={errors.price ? 'error' : 'default'}
              message={errors.price?.message}
              type="number"
              label="Harga Jual"
              name="price"
              control={control}
              required
            />

            <ControlledFieldText
              status={errors.amount ? 'error' : 'default'}
              message={errors.amount?.message}
              type="number"
              label="Jumlah"
              name="amount"
              control={control}
              required
            />
            <ControlledFieldSelect
              name="unitTypeId"
              control={control}
              label="Unit type"
              options={unitType}
              required
              status={errors.unitTypeId ? 'error' : 'default'}
              message={errors.unitTypeId?.message}
            />
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
          </div>
        </form>
      </div>
    </section>
  );
};
