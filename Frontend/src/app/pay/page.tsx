'use client'
import { useState, useEffect } from 'react';
import { getUserData, goToPay } from '../api';
import { useGetAuthToken } from '../hooks/token';
import { useGetCartCookies } from '@/app/hooks/index'
import { ProductItem } from '@/app/ui/addProductBtn'
import { useRouter } from 'next/navigation';

export interface UserInterface {
  email: string;
  name: string;
  surname: string;
  phone: { areaCode: string; number: number };
  identification: { type: string; number: string };
  address: AddressInterface;
}

export interface AddressInterface {
  zipCode: string;
  streetName: string;
  cityName: string;
  stateName: string;
  streetNumber: number;
  floor?: string;
  apartment?: string;
}

export default function Pay() {
  const { hasToken, token } = useGetAuthToken();
  const [userData, setUserData] = useState<UserInterface | undefined>();
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPriceProd, setTotalPriceProd] = useState<number>(0);
  const {cartItems, totalItems, totalPrice} = useGetCartCookies()
  const router = useRouter();

  useEffect(() => {
    const data = async () => {
      if (hasToken) {
        const userDataFounded = await (await getUserData(token)).response;
        setUserData(userDataFounded);
        setTotalProducts(totalItems);
        setTotalPriceProd(totalPrice);
      }
    };
    data();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productsIDsToSend = cartItems.map((item:ProductItem)=> item.id);
    const response = await goToPay(productsIDsToSend, token)
    router.push(response)
  }

  return (
    <div className="flex justify-center items-center mt-10 mx-5">
      <div className="max-w-lg p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Información del Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="font-semibold">Nombre</label>
            <input
              type="text"
              id="name"
              className="input input-bordered w-full"
              defaultValue={userData?.name || ''}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
              defaultValue={userData?.email || ''}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="surname" className="font-semibold">Apellido</label>
            <input
              type="text"
              id="surname"
              className="input input-bordered w-full"
              defaultValue={userData?.surname || ''}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cityName" className="font-semibold">Domicilio</label>
            <input
              type="text"
              id="cityName"
              className="input input-bordered w-full"
              defaultValue={userData?.address?.cityName || ''}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="zipCode" className="font-semibold">Código postal</label>
            <input
              type="text"
              id="zipCode"
              className="input input-bordered w-full"
              defaultValue={userData?.address?.zipCode || ''}
              required
            />
          </div>
          <div className="flex">
            <input
              type="string"
              defaultValue={userData?.phone?.areaCode}
              placeholder={userData?.phone?.areaCode ? userData?.phone?.areaCode : "54"}
              className="input input-bordered mr-2 w-1/5"
              required
            />
            <input
              type="string"
              defaultValue={userData?.phone?.number}
              placeholder='3114400'
              className="input input-bordered"
              required
            />
          </div>
          <div className="mb-4">
            <p className="font-semibold mt-4">Cantidad Total de Productos: {totalProducts}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Monto Total a Pagar: ${totalPriceProd}</p>
          </div>
          <button type="submit" className="btn btn-primary w-full">Pagar</button>
        </form>
      </div>
    </div>
  )
}