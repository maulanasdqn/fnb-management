import { Breadcrumbs, Button, ToastWrapper } from '@fms/atoms';
import { TProductUpdateRequest } from '@fms/entities';
import { ControlledFieldSelect, ControlledFieldText } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const DashboardProductEdit: FC = (): ReactElement => {
  const [debounceValue, setDebounceValue] = useState<string>('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<TProductUpdateRequest>({
    mode: 'all',
  });

  const params = useParams();
  const navigate = useNavigate();
  const { data } = trpc.product.findOne.useQuery({
    id: params.id as string,
  });
  const breadcrumbsItem = [
    { name: 'Update Data', path: '/dashboard/product/edit' },
  ];
  useEffect(() => {
    reset(data?.data as TProductUpdateRequest);
  }, [data, reset]);

  const { data: category } = trpc.dropdown.productCategory.useQuery();
  const { data: recipeList } = trpc.dropdown.recipe.useQuery();
  const { mutate, isPending } = trpc.product.update.useMutation();
  const onFormSubmit = handleSubmit((data) => {
    return mutate(
      {
        id: data?.id,
        name: data?.name,
        priceSelling: Number(data?.priceSelling),
        recipeId: data?.recipeId,
        productCategoryId: data?.productCategoryId,
        description: data?.description,
      },
      {
        onSuccess: () => {
          toast.success('Product Berhasil diperbarui');
          setTimeout(() => {
            navigate('/dashboard/product');
          });
        },
      }
    );
  });

  return (
    <>
      <ToastWrapper />
      <section className="w-full py-4 bg-white shadow-md rounded px-8 h-5/6 ">
        <div className="flex gap-x-1">
          <h1 className="text-grey">
            Product <span className="text-grey"> {'/'} </span>
          </h1>
          <Breadcrumbs items={breadcrumbsItem} />
        </div>
        <div className="flex items-center justify-center w-full h-full mt-16">
          <form onSubmit={onFormSubmit} className="w-full">
            <div className="grid grid-cols-2 gap-4 w-5/6 mx-auto">
              <ControlledFieldSelect
                name="productCategoryId"
                control={control}
                label="Kategori"
                options={category}
                required
              />
              <ControlledFieldSelect
                name="recipeId"
                control={control}
                label="Resep"
                options={recipeList}
                required
                status={errors.recipeId ? 'error' : 'default'}
                message={errors.recipeId?.message}
              />
              <ControlledFieldText
                type="text"
                status={errors.name ? 'error' : 'default'}
                message={errors.name?.message}
                label="Nama Produk"
                name="name"
                control={control}
              />
              <ControlledFieldText
                type="number"
                status={errors.priceSelling ? 'error' : 'default'}
                message={errors.priceSelling?.message}
                label="Harga Produk"
                name="priceSelling"
                control={control}
              />
              <ControlledFieldText
                type="text"
                status={errors.description ? 'error' : 'default'}
                message={errors.description?.message}
                label="Deskripsi produk"
                name="description"
                control={control}
              />
              <ControlledFieldText
                type="text"
                status={errors.image ? 'error' : 'default'}
                message={errors.image?.message}
                label="Link Gambar Produk"
                name="image"
                control={control}
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
    </>
  );
};
