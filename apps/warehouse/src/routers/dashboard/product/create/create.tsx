import { Button } from '@fms/atoms';
import { TProductSingleResponse } from '@fms/entities';
import { ControlledFieldText } from '@fms/organisms';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
});

type TCreateProduct = z.infer<typeof schema>;
export const DashboardProductCreate: FC = (): ReactElement => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<TCreateProduct>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

  return (
    <section className="w-full py-10 bg-white shadow-md rounded px-8 h-5/6 ">
      <div className="flex gap-x-1">
        <small className="">
          Product <span className="text-grey-400"> {'>'} </span>
        </small>
        <small className="text-primary">Create Data</small>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <form className="w-full">
          <div className="grid grid-cols-2 gap-4 w-5/6 mx-auto">
            <ControlledFieldText
              type="text"
              status={errors.name ? 'error' : 'default'}
              message={errors.name?.message}
              label="Nama Produk"
              name="name"
              control={control}
              required
            />
            <ControlledFieldText
              status={errors.priceSelling ? 'error' : 'default'}
              message={errors.priceSelling?.message}
              type="number"
              label="Harga Produk"
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
                variant="primary"
                variantType="solid"
                size="sm"
                disabled={!isValid}
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
