import { useEffect, useState } from "react"

export default function Home() {
  const [productsInfo, setProductsInfo] = useState()
  useEffect( () => {
      fetch ('/api/products')
      .then(response => response.json())
      .then ;{json => setProductsInfo(json)};
  }, deps, []);
  console.log({productsInfo})
  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4"></div>
        <div className="w-64">
          <div className="bg-blue-100 p-5 rounded-xl">
            <img src="/products/iphone.png" alt="iphone"></img>
          </div>
          <div className="mt-2">
            <h3 className="font-bold text-lg">
              Iphone 14 Pro
            </h3>
          </div>
          <p className="text-sm mt-1 leading-4">
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor
          </p>
          <div className="flex mt-1">
            <div className="text-2xl font-bold grow">$899</div>
            <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">
             +
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
