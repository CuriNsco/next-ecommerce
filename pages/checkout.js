import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";
import Formcheckout from "@/components/Formcheckout";
import ButtonType from "@/components/ButtonType";


export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => prev.filter((value, index) => index !== pos));
    }
  }

  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }

  return (
    <Layout>
      {!selectedProducts.length&&(
        <div className="mt-4 flex justify-center font-semibold text-black">No hay productos en el carrito</div>)}
             {selectedProducts&&selectedProducts.length >0 &&
        productsInfos
        .filter ((productInfo) => selectedProducts.includes (productInfo._id))
        .map((productInfo) => {
          const amount = selectedProducts.filter((id) => id === productInfo._id).length;
          return (
            <div className="flex
            bg-gray-200 px-3 py-4 rounded-2xl  w-auto
            my-6

            sm:py-2 sm:items-center sm:justify-center sm:bg-gray-200 sm:rounded-xl sm:my-4" key={productInfo._id}>

              <div className="
                flex bg-blue-200 rounded-2xl  w-auto
                sm:bg-red-200 sm:w-[132px] ">

                <img className="
                flex w-auto rounded-2xl 

                 sm:w-[132px] sm:h-[132px] sm:rounded-xl" src={productInfo.picture} alt=""/>

              </div>

              <div className="
              flex flex-col items-center  w-full 
              sm:pl-4 sm:items-center">
                <h3 className="flex text-center font-bold text-2xl text-gray-800">{productInfo.name}</h3>

                <p className="hidden sm:block sm:text-sm sm:leading-4 sm:text-gray-500">{productInfo.description}</p>

                <div className="flex mt-6 h-auto flex-row sm:mt-1">
                  <ButtonType/>
                  <div className="
                  text-lg  px-4

                  grow font-bold sm:text-xl sm:flex sm:items-center sm:ml-2 text-gray-800">${productInfo.price}
                  <div>
                    <span className="flex font-light text-xs">
                       /100grs
                    </span>
                    </div>
                  </div>
                  </div>
                  <div className="mt-4 flex">
                                                 {/* button minus */}

                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className="
                      px-4 rounded-full flex items-center

                      border border-red-500 sm:px-2 text-black"
                    >
                                                {/* svg minus button */}
                      <svg 
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                      </svg>

                                                    {/* button plus */}
                    </button>
                    <span className="px-2 text-black text-2xl px-4 ">
                      {selectedProducts.filter((id) => id === productInfo._id).length}
                    </span>
                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}

                      className="
                      px-4 flex items-center rounded-full text-black
                      bg-green-500
                      sm:px-2"
                    >
                                                   {/* svg plus button */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}   stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    </button>

                  </div>
              </div>
            </div>
          );
        })}
      <form action="/api/checkout" method="POST">
        <Formcheckout/>
        <div className="mt-8">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">

            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
        </div>
        <input type="hidden" name="products" value={selectedProducts && selectedProducts.join(',')} />
        <div className="flex items-center justify-center">
        <button type="submit" className="bg-green-500 px-5 py-2 rounded-xl font-bold text-white w-96 my-4 shadow-green-300 shadow-lg ring-2 ring-gray-500">A pagar ${subtotal}</button>
        </div>
      </form>
    </Layout>
  );
}