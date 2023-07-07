import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";
import styles from "@/styles";
import Formcheckout from "@/components/Formcheckout";

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
      {!selectedProducts.length && (
        <div className={styles.noProductsInCart}>No hay productos en el carrito</div>
      )}
      {selectedProducts &&
        selectedProducts.length &&
        productsInfos.map((productInfo) => {
          const amount = selectedProducts.filter((id) => id === productInfo._id).length;
          if (amount === 0) return null;
          return (
            <div className={styles.divProductCheckout} key={productInfo._id}>
              <div
                style={{ boxShadow: "inset 1px 0px 10px 10px rgba(0,0,0,0.1)" }}
              >
                <img className={styles.imgCheckout} src={productInfo.picture} alt="" />
              </div>
              <div className="pl-4 items-center">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">{productInfo.description}</p>
                <div className="flex mt-1">
                  <div className="grow font-bold">${productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productInfo._id)}
                      className={styles.buttonRemoveCheckout}
                    >
                      -
                    </button>
                    <span className="px-2">
                      {selectedProducts.filter((id) => id === productInfo._id).length}
                    </span>
                    <button
                      onClick={() => moreOfThisProduct(productInfo._id)}

                      className={styles.buttonAddCheckout}
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
            <h3 className={styles.h3Words}>Subtotal:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
          <div className={styles.borderDashed}>
            <h3 className={styles.h3Words}>Total:</h3>
            <h3 className="font-bold">${subtotal}</h3>
          </div>
        </div>
        <input type="hidden" name="products" value={selectedProducts && selectedProducts.join(',')} />
        <button type="submit" className={styles.buttonPay}>A pagar ${subtotal}</button>
      </form>
    </Layout>
  );
}