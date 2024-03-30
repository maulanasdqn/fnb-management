import { atom, atomFamily, selector } from 'recoil';
interface CartProductItem {
  id: string;
  name: string;
  quantity: number;
  totalPrice: number;
}
export const cartProductState = atom<CartProductItem[]>({
  key: 'cartProductState',
  default: [],
});

export const carProductSelectorState = selector({
  key: 'carProductSelectorState',
  get: ({ get }) => {
    const cartProducts = get(cartProductState);
    return cartProducts;
  },
});

export const totalQuantityState = atomFamily({
  key: 'totalQuantityState',
  default: 1,
});

export const totalPriceState = atomFamily({
  key: 'totalPriceState',
  default: (price: number) => price,
});
