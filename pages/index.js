import { useEffect, useState } from "react"
import Product from "@/components/Product";

export default function Home() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [phrase, setPhrase] = useState('');

useEffect(() => {
  fetch('/api/products')
    .then(response => response.json())
    .then(json => setProductsInfo(json));
}, []);

const categoriesNames =[...new Set(productsInfo.map(p => p.category))];

let products;
if(phrase){
  products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase));
} else {
  products = productsInfo;
}


console.log({ productsInfo });
  return (
    <div className="p-5">
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Buscar productos" className="bg-gray-200 w-full py-2 px-4 rounded-xl"></input>
      <div>
      {categoriesNames.map(categoryName =>(
      <div key={categoryName}>
        <h2 className="text-2xl py-5  capitalize">{categoryName}</h2>
        <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
        {products.filter(p => p.category === categoryName).map(productInfo => (
          <div key={productInfo._id} className="px-5 snap-start">
          <Product {...productInfo}/>
          </div>
        ))}
        </div>
        </div>
           ))}
        <div className="py-4">

        </div>
        </div>
      </div>
  )
}
