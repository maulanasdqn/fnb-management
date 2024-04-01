import { trpc } from "@fms/trpc-client";
import { ReactElement, FC } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TProductSingleResponse } from "@fms/entities";
import { ControlledFieldText } from "@fms/organisms";
import { Button } from "@fms/atoms";
import { Icon } from "@iconify/react";
import { Breadcrumbs } from "@fms/atoms";

export const DashboardProductEdit: FC = (): ReactElement => {
  const params = useParams();
  const { data, isLoading } = trpc.product.findOne.useQuery({
    id: params?.id as string,
  });

  const { control, handleSubmit } = useForm<TProductSingleResponse>({
    defaultValues: data
  });

  console.log(data)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <div className="flex flex-col gap-5 bg-white p-5 rounded-md shadow-md">
        <Breadcrumbs items={
          [
            {
              name: 'Dashboard',
              path: '/dashboard'
            },
            {
              name: 'Product',
              path: '/dashboard/product'
            }
          ]
        }/>
        <div className="flex flex-row gap-7">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="w-fit h-fit border rounded-md overflow-hidden border-grey-200">
              <img src={data?.image as string} alt={data?.name} className="w-64"/>
            </div>
            <Button className="w-fit bg-primary-700 hover:bg-primary-600 py-1.5 px-4 text-sm rounded-md flex flex-row gap-2 items-center justify-center text-white">
              <Icon icon="fa:edit" color="white" width={15}/>
              <p>Edit Gambar</p>
            </Button>
          </div>
          <div className="flex flex-col gap-4 w-[500px]">
            <ControlledFieldText control={control} name="name" label="Nama Barang"/>
            <ControlledFieldText control={control} name="priceSelling" label="Harga Jual" type="number"/>
            <Button className="w-fit bg-primary-700 hover:bg-primary-600 py-1.5 px-6 text-white rounded-md">Simpan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}