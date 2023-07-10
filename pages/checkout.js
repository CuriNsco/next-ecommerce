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
        <div className="flex justify-center font-semibold">No hay productos en el carrito</div>)}
             {selectedProducts&&selectedProducts.length >0 &&
        productsInfos
        .filter ((productInfo) => selectedProducts.includes (productInfo._id))
        .map((productInfo) => {
          const amount = selectedProducts.filter((id) => id === productInfo._id).length;
          return (
            <div className="flex py-2 items-center justify-center bg-gray-200 rounded-xl" key={productInfo._id}>
              <div
              >
                <img className="w-32 rounded-xl mx-4" src={productInfo.picture} alt=""/>
              </div>
              <div className="pl-4 items-center">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>

                <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>

                <div className="flex mt-1">
                  <ButtonType/>
                  <div className="grow font-bold text-xl flex items-center ml-2">${productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="px-2">
                      {selectedProducts.filter((id) => id === productInfo._id).length}
                    </span>
                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}

                      className="bg-green-500 px-2 rounded-lg text-black text-lg"
                    >
                      +
                    </button>
                  </div>
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
        <button type="submit" className="bg-green-500 px-5 py-2 rounded-xl font-bold text-white w-96 my-4 shadow-green-300 shadow-lg">A pagar ${subtotal}</button>
        </div>
      </form>
    </Layout>
  );
}