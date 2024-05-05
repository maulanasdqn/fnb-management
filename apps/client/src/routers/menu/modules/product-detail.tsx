import { FC, ReactElement, useEffect, useState } from 'react';
import { currencyFormat, useGetLocalStorage } from '@fms/utilities';
import { TProductSingleResponse } from '@fms/entities';
import { CustomOrder } from './custom-order';
import { ControlledFieldRadioGroup } from '@fms/organisms';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { match } from 'ts-pattern';
import { useLocalStorage } from '@fms/utilities';
import { useNavigate, useSearchParams } from 'react-router-dom';

const schema = z.object({
  variant: z
    .string({ required_error: 'Variant Wajib Diisi' })
    .min(1, { message: 'Variant Wajib Diisi' }),
  iceLevel: z.string({ required_error: 'Es Wajib Diisi' }).min(1, {
    message: 'Es Wajib Diisi',
  }),
  sugarLevel: z.string({ required_error: 'Gula Wajib Diisi' }).min(1, {
    message: 'Gula Wajib Diisi',
  }),
  topping: z.string().optional(),
});

type TSelectedMenu = z.infer<typeof schema>;

export type TSubmitedData = {
  variant: TSelectedMenu;
} & TProductSingleResponse['data'] & { quantity: number };

export const ProductDetail: FC<{
  loading?: boolean;
  
}&TProductSingleResponse> = ({ loading, data }): ReactElement => {
  const [qty, setQty] = useState<number>(1);

  const [cartData] = useGetLocalStorage<TSubmitedData[]>('order-data');

  const [getParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<TSelectedMenu>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      variant: 'reguler',
      topping: 'no',
    },
  });

  useEffect(() => {
    if (getParams.get('indexDetail')) {
      reset({
        variant:
          cartData?.[Number(getParams.get('indexDetail'))].variant?.variant,
        topping:
          cartData?.[Number(getParams.get('indexDetail'))].variant?.topping,
        iceLevel:
          cartData?.[Number(getParams.get('indexDetail'))].variant?.iceLevel,
        sugarLevel:
          cartData?.[Number(getParams.get('indexDetail'))].variant?.sugarLevel,
      });
      setQty(cartData?.[Number(getParams.get('indexDetail'))].quantity);
    }
  }, []);

  const toppingType = watch('topping');
  const variantType = watch('variant');

  const [orderData, setOrderData] = useLocalStorage<TSubmitedData[]>(
    'order-data',
    []
  );

  const listVariant = [
    { name: 'Reguler', value: 'reguler', price: 'Gratis' },
    { name: 'Large', value: 'large', price: '5000' },
  ];

  const listIceLevel = [
    { name: 'No Ice', value: 'no' },
    { name: 'Less Ice', value: 'less' },
    { name: 'Normal Ice', value: 'normal' },
    { name: 'Extra Ice', value: 'extra' },
  ];

  const sugarLevel = [
    { name: 'No Sugar', value: 'no' },
    { name: 'Less Sugar', value: 'less' },
    { name: 'Normal Sugar', value: 'normal' },
    { name: 'Extra Sugar', value: 'extra' },
  ];

  const listTopping = [
    {
      name: 'Tidak Pake Topping',
      value: 'no',
      price: 'Gratis',
    },
    { name: 'ice cream mango', value: 'mango', price: '5000' },
    { name: 'ice cream cokelat', value: 'cokelat', price: '5000' },
    { name: 'ice cream vanilla', value: 'vanilla', price: '5000' },
    { name: 'ice cream strawberry', value: 'strawberry', price: '5000' },
    { name: 'macchiato cream', value: 'macchiato', price: '5000' },
    { name: 'cheese cream', value: 'cheese', price: '5000' },
    { name: 'oreo cookie crumb', value: 'oreo', price: '5000' },
    { name: 'ice cream avocado', value: 'avocado', price: '5000' },
  ];

  const getVariantPrice = isNaN(
    Number(listVariant.find((variant) => variant.value === variantType)?.price)
  )
    ? 0
    : Number(
        listVariant.find((variant) => variant.value === variantType)?.price
      );

  const getToppingPrice = isNaN(
    Number(listTopping.find((topping) => topping.value === toppingType)?.price)
  )
    ? 0
    : Number(
        listTopping.find((topping) => topping.value === toppingType)?.price
      );

  const handleMinus = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handlePlus = () => {
    setQty(qty + 1);
  };

  const priceActual = isNaN(Number(data?.priceSelling))
    ? 0
    : Number(data?.priceSelling);

  const price = match({
    topping: getToppingPrice,
    variant: getVariantPrice,
  })
    .with(
      {
        topping: 0,
        variant: 0,
      },
      () => priceActual
    )
    .with(
      { variant: getVariantPrice, topping: getToppingPrice },
      () => priceActual + getToppingPrice + getVariantPrice
    )
    .with(
      { variant: 0, topping: getToppingPrice },
      () => priceActual + getToppingPrice
    )
    .with(
      {
        topping: 0,
        variant: getVariantPrice,
      },
      () => priceActual + getVariantPrice
    )
    .with(
      {
        variant: getVariantPrice,
        topping: undefined,
      },
      () => priceActual + getVariantPrice
    )
    .with(
      {
        topping: getToppingPrice,
        variant: undefined,
      },
      () => priceActual + getToppingPrice
    )
    .with(
      {
        variant: undefined,
        topping: undefined,
      },
      () => priceActual
    )
    .with({ variant: 0, topping: undefined }, () => priceActual)
    .with({ topping: 0, variant: undefined }, () => priceActual)
    .otherwise(() => priceActual);

    console.log(data)
  return loading ? (
    <div key={data?.id} className="w-full min-h-screen bg-white p-4">
      <div className="flex flex-col gap-y-2">
        <div className="bg-grey-100 w-full h-[380px] animate-pulse mx-auto rounded-lg"></div>
        <div className="w-1/2 h-9 bg-grey-100 animate-pulse rounded-full"></div>
        <div className="w-full h-5 bg-grey-100 animate-pulse rounded-full"></div>
        <div className="w-3/4 h-5 bg-grey-100 animate-pulse rounded-full"></div>
        <div className="w-1/3 h-8  bg-grey-100 animate-pulse rounded-full mt-2"></div>
      </div>
      <div className="mt-8">
        <div className="w-1/3 h-7 bg-grey-100 animate-pulse mt-3 rounded-2xl"></div>
        <div className="flex justify-between w-full mt-3">
          <div className="w-1/3 h-6 bg-grey-100 animate-pulse mt-3 rounded-full"></div>
          <div className="w-1/4 h-6 bg-grey-100 animate-pulse mt-3 rounded-full"></div>
        </div>
        <div className="flex justify-between w-full mt-3">
          <div className="w-1/3 h-6 bg-grey-100 animate-pulse mt-3 rounded-full"></div>
          <div className="w-1/4 h-6 bg-grey-100 animate-pulse mt-3 rounded-full"></div>
        </div>
      </div>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit((val) => {
        const currentObj = {
          ...data,
          id: data?.id as string,
          name: data?.name as string,
          priceSelling: price,
          quantity: qty,
          variant: val,
        };

        if (getParams.get('indexDetail')) {
          const index = Number(getParams.get('indexDetail'));
          const updatedData = [...orderData]; 
          updatedData[index] = currentObj; 
          setOrderData(updatedData); 
        } else {
          if (!orderData) {
            setOrderData([currentObj]);
          } else {
            setOrderData([...orderData, currentObj]);
          }
        }

        if (getParams.get('indexDetail')) {
          window.location.reload();
          navigate(-1);
        } else {
          navigate('/', { replace: true });
        }
      })}
    >
      <section className="w-full min-h-screen relative bg-grey-100 overflow-y-auto pb-16 mb-16">
        <div className="flex flex-col gap-y-3 p-4 bg-white">
          <figure>
            <img
              src={data?.image || '/no-photo.jpg'}
              alt="noPhoto"
              width={200}
              height={200}
              className="object-cover bg-cover w-full rounded-lg border border-grey-100 shadow-sm"
            />
            <figcaption className="text-2xl font-bold mt-3">
              {data?.name}
            </figcaption>
          </figure>
          <div className="text-grey-900">
            <p>{data?.description}</p>
          </div>
          <div className="font-bold text-xl">
            <h3>{currencyFormat(data?.priceSelling as number)}</h3>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Variant</h2>
            <small className="text-primary ">
              Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
            </small>
          </div>
          <ControlledFieldRadioGroup
            control={control}
            name={'variant'}
            status={errors.variant ? 'error' : 'default'}
            message={errors.variant?.message}
            options={listVariant.map((variant) => ({
              label: variant.name,
              value: variant.value,
              additional: isNaN(Number(variant.price))
                ? variant.price
                : currencyFormat(Number(variant.price)),
            }))}
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Ice Level</h2>
            <small className="text-primary ">
              Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
            </small>
          </div>
          <ControlledFieldRadioGroup
            control={control}
            name={'iceLevel'}
            options={listIceLevel.map((iceLevel) => ({
              label: iceLevel.name,
              value: iceLevel.value,
            }))}
          />
        </div>

        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Sugar Level</h2>
            <small className="text-primary ">
              Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
            </small>
          </div>
          <ControlledFieldRadioGroup
            control={control}
            name={'sugarLevel'}
            options={sugarLevel.map((sugarLevel) => ({
              label: sugarLevel.name,
              value: sugarLevel.value,
            }))}
          />
        </div>

        <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
          <div className="border-b border-b-slate border-dotted py-2">
            <h2 className="font-bold text-xl text-grey-950">Pilihan Topping</h2>
            <small className="text-primary ">
              Opsional . <span className="text-grey-500">Pilih maks. 3</span>
            </small>
          </div>

          <ControlledFieldRadioGroup
            control={control}
            name={'topping'}
            options={listTopping.map((topping) => ({
              label: topping.name,
              value: topping.value,
              additional: isNaN(Number(topping.price))
                ? topping.price
                : currencyFormat(Number(topping.price)),
            }))}
          />
        </div>
        <CustomOrder
          quantity={qty}
          handleMinus={handleMinus}
          handlePlus={handlePlus}
          isValid={isValid}
          loading={loading}
          price={price}
        />
      </section>
    </form>
  );
};
