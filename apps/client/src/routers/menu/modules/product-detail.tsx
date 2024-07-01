import {
  ChangeEventHandler,
  FC,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import {
  capitalizeWords,
  currencyFormat,
  useGetLocalStorage,
} from '@fms/utilities';
import { TProductSingleResponse } from '@fms/entities';
import { CustomOrder } from './custom-order';
import { ControlledFieldRadioGroup } from '@fms/organisms';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { match } from 'ts-pattern';
import { useLocalStorage } from '@fms/utilities';
import { useNavigate, useSearchParams } from 'react-router-dom';
const variantOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});
const schema = z.object({
  variant: z.object({
    id: z.string(),
    name: z.string({
      required_error: 'Variant Harus Dipilih',
    }),
  }),

  iceLevel: z.object({
    id: z.string(),
    name: z.string({
      required_error: 'Es Harus Dipilih',
    }),
  }),

  sugarLevel:z.object({
    id: z.string(),
    name: z.string({
      required_error: 'Gula Harus Dipilih',
    }),
  }),
  topping: z.array(variantOptionSchema).optional(),
});

type TSelectedMenu = z.infer<typeof schema>;
type Toption = z.infer<typeof variantOptionSchema>;
export type TSubmitedData = {
  variant: TSelectedMenu;
} & TProductSingleResponse['data'] & { quantity: number };

export const ProductDetail: FC<
  {
    loading?: boolean;
  } & TProductSingleResponse
> = ({ loading, data }): ReactElement => {
  const [qty, setQty] = useState<number>(1);
  const [selectedToppings, setSelectedToppings] = useState<Toption[]>([]);
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
      variant: {id:'', name: 'regular'},
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

  const variantType = watch('variant');

  const [orderData, setOrderData] = useLocalStorage<TSubmitedData[]>(
    'order-data',
    []
  );

  const listVariant = data?.variants?.filter((item) => item.name === 'Variant');
  const listIceLevel = data?.variants?.filter(
    (item) => item.name === 'Ice Level'
  );
  const listSugarLevel = data?.variants?.filter(
    (item) => item.name === 'Sugar Level'
  );
  const listTopping = data?.variants?.filter((item) => {
    if (item.name === 'Topping') {
      return {
        ...item,
        options: item.options.sort((a, b) =>
          a.price === 0 ? -1 : b.price === 0 ? 1 : 0
        ),
      };
    }
    return item.name === 'Topping';
  });

  const getVariantPrice =
    Number(
      listVariant?.find((variant) =>variant?.options?.find((item) => item.id === variantType.id)?.price)?.options?.find((item) => item.id === variantType.id)?.price
    ) || 0;


  const handleMinus = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handlePlus = () => {
    setQty(qty + 1);
  };

  const handleChangeTopping: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    let newSetValue = [...selectedToppings];

    const newSelectedTopping = data?.variants
      ?.flatMap((item) => item.options)
      .find((option) => option.id === value);

    if (!newSelectedTopping) return;

    if (event.target.checked) {
      if (newSelectedTopping.price === 0) {
        newSetValue = [newSelectedTopping as Toption];
      } else {
        if (newSetValue.length < 3) {
          newSetValue = [...newSetValue, newSelectedTopping as Toption];
        } else {
          event.target.checked = false;
        }
      }
    } else {
      newSetValue = newSetValue.filter((item) => item.id !== value);
    }

    setSelectedToppings(newSetValue);
  };

  const totalToppingPrice = selectedToppings
    .map((item) => item.price)
    .reduce((a, b) => a + b, 0);

  const priceActual = isNaN(Number(data?.priceSelling))
    ? 0
    : Number(data?.priceSelling);

  // console.log({
  //   topping: totalToppingPrice,
  //   variant: getVariantPrice,
  //   priceActual: priceActual,
  // });

  const price = match({
    topping: totalToppingPrice,
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
      { variant: getVariantPrice, topping: totalToppingPrice },
      () => priceActual + totalToppingPrice + getVariantPrice
    )
    .with(
      { variant: 0, topping: totalToppingPrice },
      () => priceActual + totalToppingPrice
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
        topping: totalToppingPrice,
        variant: undefined,
      },
      () => priceActual + totalToppingPrice
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
  // console.log(totalToppingPrice);
  // console.log(selectedToppings);
  // console.log(orderData);
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
          variant: {
            variant: val.variant,
            iceLevel: val.iceLevel,
            sugarLevel: val.sugarLevel,
            topping: selectedToppings,
          },
        };
          
        if (getParams.get('indexDetail')) {
          const index = Number(getParams.get('indexDetail'));
          const updatedOrderData = [...orderData];
          updatedOrderData[index] = {
            ...currentObj,
            variant: {
              variant: val.variant,
              iceLevel: val.iceLevel,
              sugarLevel: val.sugarLevel,
              topping: selectedToppings,
            },
          };
          setOrderData(updatedOrderData);
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

        {listVariant?.map((variant, idx) => (
          <div className="flex flex-col gap-y-2 mt-2 bg-white p-4" key={idx}>
            <div className="border-b border-b-slate border-dotted py-2">
              <h2 className="font-bold text-xl text-grey-950">
                {variant.name}
              </h2>
              <small className="text-primary ">
                Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
              </small>
            </div>
            <ControlledFieldRadioGroup
              control={control}
              name={'variant'}
              status={errors.variant ? 'error' : 'default'}
              message={errors.variant?.message}
              options={variant?.options?.map((option) => ({
                id: option.id,
                label: capitalizeWords(option.name) || '',
                value: option,
                additional:
                  option.price === 0 ? 'Gratis' : currencyFormat(option.price as number),
              }))}
            />
          </div>
        ))}

        {listIceLevel?.map((iceLevel) => (
          <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
            <div className="border-b border-b-slate border-dotted py-2">
              <h2 className="font-bold text-xl text-grey-950">
                {iceLevel.name}
              </h2>
              <small className="text-primary ">
                Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
              </small>
            </div>
            <ControlledFieldRadioGroup
              control={control}
              name={'iceLevel'}
              options={iceLevel?.options?.map((option) => ({
                label: capitalizeWords(option.name) || '',
                value: option,
                additional: 'Gratis',
              }))}
            />
          </div>
        ))}

        {listSugarLevel?.map((sugarLevel) => (
          <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
            <div className="border-b border-b-slate border-dotted py-2">
              <h2 className="font-bold text-xl text-grey-950">
                {sugarLevel.name}
              </h2>
              <small className="text-primary ">
                Harus Dipilih . <span className="text-grey-500">Pilih 1</span>
              </small>
            </div>
            <ControlledFieldRadioGroup
              control={control}
              name={'sugarLevel'}
              options={sugarLevel?.options?.map((option) => ({
                label: capitalizeWords(option.name) || '',
                value: option,
                additional: 'Gratis',
              }))}
            />
          </div>
        ))}
        {listTopping?.map((topping) => (
          <div className="flex flex-col gap-y-2 mt-2 bg-white p-4">
            <div className="border-b border-b-slate border-dotted py-2">
              <h2 className="font-bold text-xl text-grey-950">
                Pilihan {topping.name}
              </h2>
              <small className="text-primary ">
                Opsional . <span className="text-grey-500">Pilih maks. 3</span>
              </small>
            </div>
            <div className="flex flex-col w-full gap-y-4">
              {topping?.options.map((item, idx) => (
                <div className="grid grid-cols-2 items-center justify-between w-full border-b border-b-grey-100 py-2">
                  <div>
                    <p className="text-grey">{item.name}</p>
                  </div>
                  <div className="place-self-end">
                    <label
                      key={idx}
                      className="flex items-center flex-row-reverse gap-x-2 text-grey"
                    >
                      <input
                        id={item.id}
                        type="checkbox"
                        value={item.id}
                        onChange={handleChangeTopping}
                        disabled={
                          (selectedToppings.some((item) => item.price === 0) &&
                            item.price !== 0) ||
                          (selectedToppings.length >= 3 &&
                            !selectedToppings.some(
                              (option) => option.id === item.id
                            ))
                        }
                        className="mr-2"
                      />
                      {item.price === 0
                        ? 'Gratis'
                        : currencyFormat(Number(item.price))}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

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
