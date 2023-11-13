'use client'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '@/app/assets/profile-pic-placeholder.png'
import { useEffect, useState } from 'react'
import { getToken, removeAuthToken } from '@/app/lib/token'
import {useGetAuthToken, useRemoveAuthToken} from '../hooks/token'

export default function ProfileButton(){
  const [isUserOn, setIsUserOn] = useState<boolean>(false);
  const [deleteAuthToken, setDeleteAuthToken] = useState<boolean>(false);
  const token = useGetAuthToken();

  useEffect(()=>{
    if(token.token) {
      setIsUserOn(true);
      setDeleteAuthToken(false)
    }
  }, [token])
  
  useRemoveAuthToken(deleteAuthToken)
  function handleLogout(){
    setIsUserOn(false)
    setDeleteAuthToken(true)
  }

  const userOn = <div className="card-body">
                  <Link href='/profile'>Mi perfil</Link>
                  <Link href='/my-orders'>Mis pedidos</Link>
                  <Link href='/' onClick={handleLogout}>Cerrar sesión</Link>
                </div>;
  const userOff = <div className="card-body">
                    <Link href='/login'className="btn btn-primary btn-block">INICIAR SESIÓN 🔑</Link>
                  </div>;
  return (
    <div className="dropdown dropdown-end mr-4">
      <label className="btn-ghost btn-circle btn">
        <button className="indicator">
          <Image src={profilePic} alt="Profile" />
        </button>
      </label>
        <div tabIndex={0} className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30">
          {isUserOn ? userOn : userOff}
        </div>
    </div>
  )
}