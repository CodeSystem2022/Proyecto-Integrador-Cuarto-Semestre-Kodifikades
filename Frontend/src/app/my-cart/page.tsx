'use client'
import {ProductItem}  from '@/app/ui/addProductBtn'
import Image from 'next/image'
import Link from 'next/link'
import {useGetCartCookies} from '@/app/hooks/index'
import { useGetAuthToken } from '../hooks/token'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function MyCart(){
  const cartItems = useGetCartCookies().cartItems;
  const router = useRouter()
  const {token, hasToken} = useGetAuthToken();
  const [showErrorCode, setShowErrorCode] = useState<boolean>(false);

  const handlePayClick = () => {
    if (hasToken) {
      router.push('/pay') 
    } else {
      setShowErrorCode(true);
      setTimeout(()=>{
        setShowErrorCode(false)
      },5000)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-center mb-8 text-2xl pt-10">Mis Pedidos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cartItems.map((item: ProductItem ) => (
          <div key={item.id} className="bg-white p-4 shadow rounded mx-5">
            <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
            <p className="font-bold text-xl mt-3 mb-3">Precio: ${item.unit_price}</p>
            <Link href={'/product/'+item.id}>
              <figure className="px-10 pt-10">
                <Image src={item.img} width='200' height='60' alt={item.title} className="rounded-xl object-cover" />
              </figure>
            </Link>
            <button className='btn-circle bg-red-500 text-sm font-semibold justify-end w-full'>Remover producto</button>
          </div>
        ))}
      </div> 
      <div className='flex justify-center'>   
      <button className='btn-circle bg-blue-500 w-64 mt-11 mx-auto text-white rounded-md hover:bg-blue-600' onClick={handlePayClick}>COMPRAR AHORA</button></div>
      {showErrorCode && 
        <div className="card bg-red-100 p-4 shadow rounded">
          <h2 className="font-semibold text-lg mb-2">Error de autenticación</h2>
          <p className="text-gray-600">Debes estar logueado para poder comprar.</p>
        </div>} 
        <div className='h-screen'></div>
    </div>
  );


}