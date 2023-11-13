'use client'
import { useEffect, useState } from 'react';
import logo from '@/app/assets/craft-beer-logo-with-beer.png';
import Image from 'next/image';
import { signUp, sendAuthCode } from '@/app/api'
import { useRouter } from 'next/navigation';
import { useLoginUser } from '@/app/hooks'


export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState('');
  const router = useRouter();
  const {logged,error} = useLoginUser({email, code});


  async function onSubmit(e: any) {
    e.preventDefault();
    if (!showCodeInput) {
      setShowCodeInput(true);
      await sendAuthCode(email)
    } else {
      if(error) alert({error, Message: 'hubo un error al loguearse'})
      if(logged) router.push('/')
    }
  }
  const goBack = () => {
    setShowCodeInput(false);
  }

  return (
    <section className="flex justify-center items-center mt-10 ">
      <div className="card card-normal bg-base-100 shadow-xl overflow-x-auto mx-5 max-w-xl">
        <figure className="text-center">
          <Image src={logo} alt="Logo" />
        </figure>
        <form className="card-body text-center" onSubmit={onSubmit}>
          {showCodeInput ? (
            <>
              <h2 className="card-title justify-center bg-slate-200 py-2 w-9/12 m-auto">⌚ INGRESÁ EL CÓDIGO</h2>
              <input
                type="text"
                placeholder="Ingresá el código aquí."
                className="input input-bordered w-9/12 m-auto"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <div className="card-actions justify-center">
                <button className="btn btn-secondary mt-4 w-1/2 m-auto bg-purple-500" type="submit" onClick={goBack}>
                  Atrás
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="card-title justify-center bg-slate-200 py-2 w-9/12 m-auto "> 💻 INGRESÁ TU EMAIL</h2>
              <input
                type="email"
                placeholder="tucorreo@gmail.com"
                className="input input-bordered w-9/12 m-auto"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
            <button className="btn btn-primary mt-4 w-1/2 m-auto bg-green-300 font-bold" type="submit">
              {showCodeInput ? 'Ingresar' : 'Recibir código'}
            </button>
        </form>
      </div>
    </section>
  );
}
