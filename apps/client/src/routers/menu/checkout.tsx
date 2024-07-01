import { ControlledFieldSelect, ControlledFieldText } from '@fms/organisms';
import { FC, ReactElement, Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TSelectedMenu, TSubmitedData } from './modules';
import { currencyFormat, useDebounce, useLocalStorage } from '@fms/utilities';
import { CheckoutCard } from './modules/checkout-card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { trpc } from '@fms/trpc-client';
import { TOrderCreateRequest, EOrderType } from '@fms/entities';
import { Button } from '@fms/atoms';

export const MenuCheckoutPage: FC<TSelectedMenu> = (): ReactElement => {
  const [orderMethod, setOrderMethod] = useState<string>('Dine In');
  const [search, setSearch] = useState<string>('');
  const [debounceValue, setDebounceValue] = useState<string>('');
  const navigate = useNavigate();
  const [getParams] = useSearchParams();

  const [cartData, setCartData] = useLocalStorage<TSubmitedData[]>(
    'order-data',
    []
  );
  useDebounce(() => {
    setDebounceValue(search);
  }, 500);

  const { data: paymentList, isPending } = trpc.dropdown.payment.useQuery({
    search: debounceValue,
  });

  const { mutate } = trpc.order.create.useMutation();
  const getTotalPrice = (cartData: TSubmitedData[]) =>
    cartData.reduce(
      (acc, item) => acc + item.quantity * (item.priceSelling ?? 0),
      0
    );

  const tax = getTotalPrice(cartData) * 0.1;

  const [updateTotalPrice, setUpdateTotalPrice] = useState<number>(
    getTotalPrice(cartData)
  );

  const handleUpdatePrice = (val: number, index: number) => {
    const newData = [...cartData];
    newData[index].quantity = val;
    setUpdateTotalPrice(getTotalPrice(newData));
    setCartData(newData);
  };

  const { control, handleSubmit,formState:{isValid} } = useForm<TOrderCreateRequest>({
    defaultValues: {
      customerName: '',
      placeId: getParams.get('tableId') || '',
    },
  });

  const handleOrder = handleSubmit((data) => {
    const newState = cartData.map((item) => {
      const toppingIds =
        item.variant.topping?.map((topping) => topping.id) || [];
      return {
        productId: item.id as string,
        quantity: item.quantity as number,
        variantOptionIds: [
          item?.variant.iceLevel.id,
          item?.variant.sugarLevel.id,
          item.variant.variant.id,
          ...toppingIds,
        ] as string[] | undefined,
      };
    }) as TOrderCreateRequest['details'];
    mutate(
      {
        type: orderMethod,
        customerName: data?.customerName,
        paymentId: data?.paymentId,
        details: newState,
      },
      {
        onSuccess: () => {
          navigate('success');
          localStorage.clear();
        },
      }
    );
  });
  const tableNumber = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form onSubmit={handleOrder}>
        <section className="p-4">
          <h1 className="text-2xl font-bold">Form Pemesan </h1>
          <div className="flex flex-col py-4 gap-y-4">
            <ControlledFieldText
              required
              control={control}
              size="md"
              name="customerName"
              type="name"
              label="Nama"
              placeholder="Masukan Nama Pemesan"
            />
            <ControlledFieldSelect
              control={control}
              size="md"
              name="placeId"
              label="Nomor Meja"
              placeholder="Nomer Meja"
              options={tableNumber}
            />
          </div>
          <h1 className="text-2xl font-bold">Detail Pesanan </h1>

          {cartData.map((data, index) => {
            return (
              <CheckoutCard
                updatePrice={handleUpdatePrice}
                key={index}
                order={data}
                quantity={data?.quantity}
                index={index}
              />
            );
          })}

          <h1 className="text-2xl font-bold">Payment Summary </h1>

          <div className="flex flex-col pt-4 pb-[80px]">
            <div className="flex w-full justify-between">
              <span>Subtotal Pesanan</span>
              <span>{currencyFormat(updateTotalPrice)}</span>
            </div>
            <div className="flex w-full justify-between ">
              <span>PPN 10%</span>
              <span>{currencyFormat(tax)}</span>
            </div>
            <div className="flex w-full justify-between ">
              <span>Total Pembayaran</span>
              <span>{currencyFormat(updateTotalPrice + tax)}</span>
            </div>
            <div className="">
              <p className="font-bold pt-4">Metode Pemesanan :</p>
              <div className="flex items-center gap-x-2 my-2">
                <label htmlFor="type" className="flex gap-x-2 items-center">
                  <input
                    type="radio"
                    name="type"
                    value={EOrderType.DINEIN}
                    checked={orderMethod === EOrderType.DINEIN}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  Makan ditempat
                </label>
                <label htmlFor="type" className="flex gap-x-2 items-center">
                  <input
                    type="radio"
                    name="type"
                    value={EOrderType.TAKEAWAY}
                    checked={orderMethod === EOrderType.TAKEAWAY}
                    className="form-radio text-indigo-600 h-5 w-5"
                    onChange={(e) => setOrderMethod(e.target.value)}
                  />
                  Take Away
                </label>
              </div>
            </div>
            <div>
              <p className="font-bold pt-4">Metode Pembayaran :</p>
              <div className="my-2">
                <ControlledFieldSelect
                  control={control}
                  name="paymentId"
                  options={paymentList}
                />
              </div>
              <p className="text-xs">*Silahkan melakukan pembayaran di kasir</p>
            </div>
          </div>
        </section>
        <Button
          type="submit"
          disabled={isPending || !isValid}
          state={isPending ? 'loading' : 'default' }
          className="flex fixed bottom-0 w-full h-[60px] bg-primary justify-center items-center text-white font-bold text-lg"
        >
          Pesan Sekarang
        </Button>
      </form>
    </Suspense>
  );
};
