import { Button } from '@fms/atoms';
import { TProductSingleResponse } from '@fms/entities';
import { ControlledFieldText } from '@fms/organisms';
import { trpc } from '@fms/trpc-client';
import { FC, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const DashboardProductEdit: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TProductSingleResponse>();
 
  const params = useParams();
  const navigate = useNavigate();
  const { data } = trpc.product.findOne.useQuery({
    id: params.id as string,
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onFormSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="w-full py-10 bg-white shadow-md rounded px-8 h-5/6 ">
      <div className='flex gap-x-1'> 
        <small className=''>Product <span className='text-grey-400'> {">"} </span></small>
        <small className='text-primary'>Edit Data</small>
      </div>
      <div className='flex items-center justify-center w-full h-full'>
        <form onSubmit={onFormSubmit} className="w-full">
          <div className="grid grid-cols-2 gap-4 w-5/6 mx-auto">
            <ControlledFieldText
              type="text"
              label="Nama Produk"
              name="name"
              control={control}
            />
            <ControlledFieldText
              type="number"
              label="Harga Produk"
              name="priceSelling"
              control={control}
            />
            <ControlledFieldText
              type="text"
              label="Deskripsi produk"
              name="description"
              control={control}
            />
            <ControlledFieldText
              type="text"
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
               onClick={()=> navigate(-1)}
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
