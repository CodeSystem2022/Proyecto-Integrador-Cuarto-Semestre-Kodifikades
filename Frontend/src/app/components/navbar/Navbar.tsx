'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/logo_image.png'
import ShoppingCartButton from './ShopppingCartButton';
import ProfileButton from '../../ui/profileBtn';
import { redirect } from 'next/navigation';
import HamburgerButton from '@/app/ui/hamburguerBtn'

async function searchProducts(formData: FormData) {
  // "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) redirect(`search?query=${searchQuery}`);
}

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  return (

    <div className="p-3 bg-orange-100 shadow md:flex md:items-center md:justify-between">

      <div className="flex justify-between items-center ">

        <div className="text-2xl cursor-pointer">
        <Link href="/" className='btn btn-ghost text-xl normal-case'>
            <Image src={logo} alt="logo" width='50' height='50' />
          </Link>
        </div>

        <div className="text-3xl cursor-pointer mx-2 md:hidden block">
          <HamburgerButton onClick={() => setShowLinks(!showLinks)} />
        </div>
      </div>

      <div className="md:flex md:items-center z-[-1] md:z-auto md:static absolute  bg-orange-100 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
        <div className="mx-4 my-6 md:my-0">
          <Link href="/" className="text-xl hover:text-cyan-500 duration-500">Inicio</Link>
        </div>
        <div className="mx-4 my-6 md:my-0">
          <Link href="/products" className="text-xl hover:text-cyan-500 duration-500">Productos</Link>
        </div>
        <div className="mx-4 my-6 md:my-0">
          <Link href="/kodifikades" className="text-xl hover:text-cyan-500 duration-500">Kodifikades</Link>
        </div>
        <div className="mx-4 my-6 md:my-0">
          <Link href="/form" className="text-xl hover:text-cyan-500 duration-500">Contacto</Link>
        </div>
     
        <div className="mx-4 my-6 md:my-0">
          <ShoppingCartButton cart={0} />
        </div>

        <div className="flex-none">
          <ProfileButton />
        </div>

        <h2 className=""></h2>
      </div>


    </div>



  );
}