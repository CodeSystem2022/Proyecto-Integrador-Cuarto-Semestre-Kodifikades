import Link from 'next/link';
import React, { useState } from 'react';

interface HamburgerButtonProps {
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick }) => {
  const [showLinks, setShowLinks] = useState(false);

const handleMenuClick = () => {
  setShowLinks(false);
};

  return (
    <div className='dropdown dropdown-end mr-4'>
      <button onClick={() => setShowLinks(!showLinks)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6H20M4 12H20M4 18H20"
          />
        </svg>
      </button>
      <div className={`md:flex-col ${showLinks ? 'block' : 'hidden'} mt-3 w-52 bg-base-100 shadow z-30 dropdown-content text-base card-compact`}>
        <Link href="/">
          <div onClick={handleMenuClick} className="block py-2 px-4 hover:bg-base-200">Inicio</div>
        </Link>
        <Link href="/products">
          <div onClick={handleMenuClick} className="block py-2 px-4 hover:bg-base-200">Productos</div>
        </Link>
        <Link href="/kodifikades">
          <div onClick={handleMenuClick} className="block py-2 px-4 hover:bg-base-200">Kodifikades</div>
        </Link>
        <Link href="/form">
          <div onClick={handleMenuClick} className="block py-2 px-4 hover:bg-base-200">Contacto</div>
        </Link>
        <Link href="/my-orders">
          <div onClick={handleMenuClick} className="block py-2 px-4 hover:bg-base-200">Carrito</div>
        </Link>
        <Link href="/login">
          <div onClick={handleMenuClick} className="block py-2 px-4 hover:bg-base-200">Perfil</div>
        </Link>
        
      </div>
    </div>
  );
}

export default HamburgerButton;
