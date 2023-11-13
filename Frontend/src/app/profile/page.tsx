'use client'
import { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../api';
import { useGetAuthToken } from '../hooks/token';
import { UserInterface } from '../pay/page';


export default function UserProfile() {
  const { hasToken, token } = useGetAuthToken();
  const [userData, setUserData] = useState<UserInterface | undefined>();


  useEffect(()=>{
    const getUser = async()=>{
      if(hasToken){
        const user = await getUserData(token)
        setUserData(user.response)
      }
    }
    getUser();
  },[])


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const surname = target.surname.value;
    const email = target.email.value;
    const areaCode = target.areaCode.value;
    const phoneNumber = target.phoneNumber.value;
    const identification = Number(target.dni.value);
    const stateName = target.stateName.value;
    const cityName = target.cityName.value;
    const zipCode = target.zipCode.value;
    const streetName = target.streetName.value;
    const streetNumber = target.streetNumber.value;
    const floor = target.floor.value;
    const apartment = target.apartment.value;

    const user: UserInterface = {
      name,
      surname,
      email,
      identification: {number:String(identification), type: 'DNI'},
      phone: {areaCode, number: phoneNumber},
      address: {
        zipCode,
        streetName,
        cityName,
        stateName,
        streetNumber,
        floor,
        apartment
      }
    }
    const res = await updateUserData(user, token);
    if(res){
      alert('Se actualizaron tus datos con exito')
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-center mb-8 text-2xl">Mi perfil</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={userData?.name}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="surname">
            Apellido
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            defaultValue={userData?.surname}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Correo
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={userData?.email}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="areaCode">
            Número de teléfono
          </label>
          <input
            id='areaCode'
            type="string"
            defaultValue={userData?.phone?.areaCode}
            placeholder={userData?.phone?.areaCode ? userData?.phone?.areaCode : "54"}
            className="input input-bordered mr-2 w-1/5"
            required
          />
          <input
            id='phoneNumber'
            type="string"
            defaultValue={userData?.phone?.number}
            placeholder='3114400'
            className="input input-bordered w-auto"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dni">
            Número de documento
          </label>
          <input
            id='dni'
            type="string"
            defaultValue={userData?.identification?.number}
            placeholder={userData?.identification?.number ? userData?.identification?.number : "38456789"}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="stateName">
            Provincia
          </label>
          <input
            id='stateName'
            type="string"
            defaultValue={userData?.address?.stateName}
            placeholder={userData?.address?.stateName ? userData?.address?.stateName : "Mendoza"}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="cityName">
            Ciudad
          </label>
          <input
            type="text"
            id="cityName"
            className="input input-bordered w-full"
            defaultValue={userData?.address?.cityName || ''}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700 font-bold mb-2">Código postal</label>
          <input
            type="text"
            id="zipCode"
            className="input input-bordered w-full"
            defaultValue={userData?.address?.zipCode || ''}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="streetName">
            Calle
          </label>
          <input
            id='streetName'
            type="string"
            defaultValue={userData?.address?.streetName}
            placeholder={userData?.address?.streetName ? userData?.address?.streetName : "Av. Corrientes"}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="streetNumber">
            Numero de calle
          </label>
          <input
            id='streetNumber'
            type="string"
            defaultValue={userData?.address?.streetNumber}
            placeholder={userData?.address?.streetNumber ? String(userData?.address?.streetNumber) : "12350"}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="mb-4 flex">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="floor">
            Piso
          </label>
          <input
            id='floor'
            type="string"
            defaultValue={userData?.phone?.areaCode}
            placeholder={userData?.phone?.areaCode ? userData?.phone?.areaCode : "54"}
            className="input input-bordered mr-2 w-1/5"
          />
          <label className="block text-gray-700 font-bold mb-2" htmlFor="apartment">
            Departamento
          </label>
          <input
            id='apartment'
            type="string"
            defaultValue={userData?.phone?.number}
            placeholder='3114400'
            className="input input-bordered"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
        >
          Actualizar Datos
        </button>
      </form>
    </div>
  );
}