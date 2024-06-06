import { Button, Breadcrumbs, ToastWrapper } from '@fms/atoms';
import { ControlledFieldSelect, ControlledFieldText } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@fms/trpc-client';
import { toast } from 'react-toastify';

const schema = z.object({
  name: z
    .string({ required_error: 'Nama Produk harus Diisi' })
    .min(1, { message: 'Nama Produk harus Diisi' }),
  priceSelling: z
    .string({ required_error: 'Harga Produk harus Diisi' })
    .min(1, { message: 'Harga Produk harus Diisi' }),
  description: z
    .string({ required_error: 'Deskripsi Produk harus Diisi' })
    .min(1, { message: 'Deskripsi Produk harus Diisi' }),
  image: z
    .string({ required_error: 'Gambar Produk harus Diisi' })
    .min(1, { message: 'Gambar Produk harus Diisi' }),
  category: z.string({ required_error: 'Kategori harus Diisi' }).min(1, {
    message: 'Kategori harus Diisi',
  }),
  price: z
    .string({
      required_error: 'Harga harus Diisi',
    })
    .min(1, { message: 'Harga harus Diisi' }),
});

type TCreateProduct = z.infer<typeof schema>;
export const DashboardProductCreate: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { mutate, isPending } = trpc.product.create.useMutation();

  const breadcrumbsItem = [
    { name: 'Create Data', path: '/dashboard/product/create' },
  ];
  const category = [
    {
      value: '05c05238-c3e3-4e3f-b688-60b6ae899d9b',
      label: 'Coffe',
    },
  ];
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors,isValid },
  } = useForm<TCreateProduct>({
    mode: 'all',
    resolver: zodResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        productCategoryId:"05c05238-c3e3-4e3f-b688-60b6ae899d9b",
        name: data?.name,
        // price: Number(data?.price),
        priceSelling: Number(data?.priceSelling),
        image: data?.image,
        description: data?.description, 
      },
      {
        onSuccess: () => {
          toast.success('Product Baru Berhasil Ditambahkan');
          reset();
          setTimeout(() => {
            navigate('/dashboard/product'); 
          },1000)
        },
      }
    );
  });
  return (
    <section className="w-full py-4 bg-white shadow-md rounded px-8 h-5/6 ">
      <ToastWrapper/>
      <div className="flex gap-x-1">
        <h1 className="text-grey">
          Product <span className="text-grey-400"> {'/'} </span>
        </h1>
        <Breadcrumbs items={breadcrumbsItem} />
      </div>
      <div className="flex items-center justify-center w-full h-full mt-16">
        <form className="w-full" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4 w-5/6 mx-auto">
            <div className="col-span-2">
              <ControlledFieldSelect
                name="category"
                control={control}
                label="Kategori"
                options={category}
                required
              />
            </div>
            <ControlledFieldText
              type="text"
              status={errors.name ? 'error' : 'default'}
              message={errors.name?.message}
              label="Nama Produk"
              name="name"
              control={control}
              required
            />
            {/* <ControlledFieldText
              type="number"
              status={errors.name ? 'error' : 'default'}
              message={errors.name?.message}
              label="Harga Produk"
              name="price"
              control={control}
              required
            /> */}
            <ControlledFieldText
              status={errors.priceSelling ? 'error' : 'default'}
              message={errors.priceSelling?.message}
              type="number"
              label="Harga Jual"
              name="priceSelling"
              control={control}
              required
            />
            <ControlledFieldText
              status={errors.description ? 'error' : 'default'}
              message={errors.description?.message}
              type="text"
              label="Deskripsi produk"
              name="description"
              control={control}
              required
            />
            <ControlledFieldText
              status={errors.image ? 'error' : 'default'}
              message={errors.image?.message}
              type="text"
              label="Link Gambar Produk"
              name="image"
              control={control}
              required
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
