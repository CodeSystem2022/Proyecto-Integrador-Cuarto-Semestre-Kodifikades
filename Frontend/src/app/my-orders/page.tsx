'use client'
import { useEffect, useState } from 'react';
import { useGetAuthToken } from '../hooks/token';
import { getMyOrders } from '../api';
import Image from 'next/image';

interface Order {
  id: string;
  productDetails: Array<{
    description: string;
    picture_url: string;
    title: string;
    unit_price: string;
  }>;
  productsIDs: [];
  status: string;
  userID: string;
}

export default function MyOrders() {
  const { token, hasToken } = useGetAuthToken();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersFounded = await getMyOrders(token);
      setOrders(ordersFounded);
    };
    getOrders();
  }, [token]);

  return (
    <section>
      <h1 className="font-bold text-center mb-8 text-2xl pt-10">Mis órdenes</h1>
      {orders.flatMap(order => (
        order.productDetails.map((product, index) => (
          <div key={index} className="bg-white p-4 shadow mb-4 rounded m-10">
            <div className="flex items-center mb-4">
              <Image src={product.picture_url} width='80' height='80' alt={product.title} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="font-semibold text-xl">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
            <p className="text-xl font-bold">${product.unit_price}</p>
            <p className="text-gray-600">Estado: {order.status === 'paid' ? 'Pagado' : 'Pendiente'}</p>
          </div>
        ))
      ))}
      <div className='h-screen'></div>
    </section>
  );
}
