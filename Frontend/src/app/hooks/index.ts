import { useEffect, useState } from "react";
import { useSetAuthToken } from "./token";
import { signUp } from "../api";
import { useRecoilState } from 'recoil';
import { cartItemsState, totalItemsState, totalPriceState } from '../lib/cartState';
import Cookies from 'js-cookie';

interface LoginProps{
  email:string;
  code:string;
}

export function useLoginUser({email, code}:LoginProps){
  const [logged, setLogged] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");
  useSetAuthToken(token);

  useEffect(() => {
    (async () => {
      if (!email || !code) return;
      const res = await signUp(email, code);
      if (res.error) {
        setLogged(false);
        setError(res.error);
        return;
      } else {
        setToken(res.token || "");
        setLogged(true);
        setError("");
      }
    })();
  }, [code, email]);

  return { logged, error };
}

export function useGetCartCookies(){
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [totalItems, setTotalItems] = useRecoilState(totalItemsState);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  useEffect(() => {
    const cartData = Cookies.get('cartData');

    if (cartData) {
      const { cartItems, totalItems, totalPrice } = JSON.parse(cartData);
      setCartItems(cartItems);
      setTotalItems(totalItems);
      setTotalPrice(totalPrice);
    }
  }, []);

  return {cartItems, totalItems, totalPrice}
}