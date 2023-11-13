import React from 'react';
import logo from '@/app/assets/craft-beer-logo-with-beer.png';
import Image from 'next/image'

const Formulario = () => {
  return (


    <section className="flex justify-center items-center mt-10">
      <div className="card p-4 card-normal bg-base-100 shadow-xl overflow-x-auto mx-5 max-w-xl">
        <figure className="text-center">
          <Image src={logo} alt="Logo" />
        </figure>
        <h2 className="text-2xl font-semibold mb-6 text-center">Formulario de Contacto</h2>

        <form action="https://www.actionforms.io/e/r/kodifikades" method="POST">

          <div className="mb-4">
            <label htmlFor="text-input" className="block text-gray-700 text-sm font-medium mb-2">Nombre</label>
            <input type="text" id="text-input" name="text-input" placeholder="Escribe tu nombre aquí." className="w-full p-2 border rounded-md"/>
          </div>

          <div className="mb-4">
            <label htmlFor="email-input" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input type="email" id="email-input" name="email-input" placeholder="Escribe tu email aquí." className="w-full p-2 border rounded-md"/>
          </div>

          <div className="mb-4">
            <label htmlFor="textarea" className="block text-gray-700 text-sm font-medium mb-2">Mensaje</label>
            <textarea id="textarea" name="textarea" className="w-full p-2 border rounded-md" placeholder="Tu mensaje..."></textarea>
          </div>

          <div className='flex justify-center items-center'>
          <button type="submit" className=" mb-2 w-1/2 object-center bg-blue-500 m-auto justify-center text-white py-2 px-4 rounded-md hover:bg-blue-600">Enviar</button>
          </div>

        </form>
      </div>
    </section>
  );
};

const FormPage = () => {
  return (
    <div>
      <Formulario />
    </div>
  );
};

export default FormPage;
