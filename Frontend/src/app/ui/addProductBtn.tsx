'use client'
import { useRecoilState } from 'recoil';
import { cartItemsState, totalItemsState, totalPriceState } from '../lib/cartState';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
export interface ProductItem {
  unit_price: number;
  title: string;
  id:string;
  img: string;
  description: string;
}

function ProductButton({ product }:{product: ProductItem}) {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [totalItems, setTotalItems] = useRecoilState(totalItemsState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  useEffect(() => {
    const cartData = JSON.stringify({ cartItems, totalItems, totalPrice });
    Cookies.set('cartData', cartData);
  }, [cartItems, totalItems, totalPrice]);


  const addToCart = () => {
    const updatedCart = [...cartItems, product] as any;
    setCartItems(updatedCart);
    setTotalItems(totalItems + 1);
    setTotalPrice(totalPrice + product.unit_price);
  };

  return (
    <div>
      <button onClick={addToCart} className="btn btn-primary">Agregar al carrito</button>
    </div>
  );
}

export default ProductButton;
