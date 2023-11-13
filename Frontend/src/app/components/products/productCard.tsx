import Image from "next/image"
import { products } from '@/app/api/index'
import Link from 'next/link'
import ProductButton from "@/app/ui/addProductBtn";

export default async function ProductCard(){
  const allProducts = await products() as any;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-5">
      {allProducts.map((product:any)=>{
        const {fields, objectID} = product;
        const {images, title, unit_price, description } = fields;

        return (
          <div key={objectID} className="card bg-base-100 shadow-xl">
            <Link href={'/product/'+objectID}>
              <figure className="px-10 pt-10">
                <Image src={images[0].url} loading="lazy" width='80' height='80' alt={title} className="rounded-xl" />
              </figure>
            </Link>
            <div className="card-body items-center text-center">
              <Link href={'/product/'+objectID}>
                <h2 className="card-title">{title}</h2>
                <p className="font-bold">${unit_price}</p>
              </Link>
              <div className="card-actions">
                <ProductButton product={{unit_price, title, id: objectID, img: images[0].url, description }}/>
              </div>
            </div>
          </div>
        )
      })} 
    </div>
  )
}
