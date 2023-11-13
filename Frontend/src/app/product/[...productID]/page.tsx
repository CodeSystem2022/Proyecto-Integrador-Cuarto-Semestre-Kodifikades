import {getProduct} from '@/app/api/index'
import ProductButton from '@/app/ui/addProductBtn';
import Image from 'next/image';

export default async function Product({params}:{params:{productID:string}}){
  const productID = params.productID[0];
  const product = await getProduct(productID) as any;
  const { description,images, title, unit_price, objectID} = product.results[0].fields
  const image = images[0].url
  return (
    <div className="card card-side bg-base-100 shadow-xl mt-28 p-14">
      <figure><Image src={image} width="150" height="400" alt="Movie"/></figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p className='font-bold'>${unit_price}</p>
        <div className="card-actions justify-end">
          <ProductButton product={{title, unit_price, img: image, id: objectID, description}} />
        </div>
      </div>
    </div>
  )
}