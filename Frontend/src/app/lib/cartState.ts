import { atom } from 'recoil';

export const cartItemsState = atom({
  key: 'cartItems',
  default: [],
});

export const totalItemsState = atom({
  key: 'totalItems',
  default: 0,
});

export const totalPriceState = atom({
  key: 'totalPrice',
  default: 0,
});
