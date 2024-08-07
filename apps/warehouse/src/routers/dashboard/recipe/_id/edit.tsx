import { FC, ReactElement, useEffect, useState } from 'react';
import { Button, Breadcrumbs, ToastWrapper } from '@fms/atoms';
import { ControlledFieldSelect, ControlledFieldText } from '@fms/organisms';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@fms/trpc-client';
import { toast } from 'react-toastify';
import { TRecipeCreateRequest, TRecipeUpdateRequest } from '@fms/entities';

export const schema = z.object({
  name: z.string().min(1, { message: 'Nama resep harus Diisi' }),
  details: z.array(
    z.object({
      ingredientId: z
        .string({ required_error: 'Ingredient harus Diisi' })
        .min(1, { message: 'Ingredient harus Diisi' }),
      amount: z
        .string({ required_error: 'Jumlah resep harus Diisi' })
        .min(1, { message: 'Jumlah resep harus Diisi' }),
      unitTypeId: z
        .string({ required_error: 'Satuan Ingredient harus Diisi' })
        .min(1, { message: 'Satuan Ingredient harus Diisi' }),
    })
  ),
});

export const UpdateRecipe: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const { mutate, isPending } = trpc.recipe.update.useMutation();
  const params = useParams();
  const { data: recipeData } = trpc.recipe.detail.useQuery({
    id: params.id as string,
  });
  const { data: ingredientList } = trpc.dropdown.ingredient.useQuery();
  const {data: unitType}= trpc.dropdown.unitType.useQuery();
  const navigate = useNavigate();
  const breadcrumbsItem = [
    { name: 'Create Data', path: '/dashboard/ingredient/create' },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TRecipeUpdateRequest>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        id: data.id,
        name: data?.name,
        description: data?.description,
        details: [
          {
            amount: Number(data?.details?.[0]?.amount),
            unitTypeId: String(data?.details?.[0]?.unitTypeId),
            ingredientId: String(data?.details?.[0]?.ingredientId),
          },       
        ],
      },
      {
        onSuccess: () => {
          toast.success('Berhasil memperbarui Resep');
          setTimeout(() => {
            navigate('/dashboard/recipe');
          }, 1000);
        },
      }
    );
  });
  
  useEffect(() => {
    reset(recipeData?.data as TRecipeUpdateRequest);
  }, [recipeData, reset]);

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
              label="Nama Resep"
              name="name"
              control={control}
              required
            />
            <ControlledFieldSelect
              name={`details.${0}.ingredientId`}
              control={control}
              label="Ingredient"
              options={ingredientList}
              required
              status={errors.details?.[0]?.ingredientId ? 'error' : 'default'}
              message={errors.details?.[0]?.ingredientId?.message}
            />

            <ControlledFieldText
              status={errors.details?.[0]?.amount ? 'error' : 'default'}
              message={errors.details?.[0]?.amount?.message}
              type="number"
              label="Jumlah"
              name={`details.${0}.amount`}
              control={control}
              required
            />
            <ControlledFieldSelect
              name={`details.${0}.unitTypeId`}
              control={control}
              label="Unit type"
              options={unitType}
              required
              status={errors.details?.[0]?.unitTypeId ? 'error' : 'default'}
              message={errors.details?.[0]?.unitTypeId?.message}
            />
            <ControlledFieldText
              status={errors.description ? 'error' : 'default'}
              message={errors.description?.message}
              type="text"
              label="Description"
              name="description"
              control={control}
              required
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
