import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import styles from "@/styles";

export default function Product({ _id, name, price, description, picture }) {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  function removeProduct() {
    const indexToRemove = selectedProducts.indexOf(_id);
    if (indexToRemove !== -1) {
      setSelectedProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts.splice(indexToRemove, 1);
        return updatedProducts;
      });
    }
  }

  const isProductSelected = selectedProducts.includes(_id);

  return (
    <div className="w-48">
      <div className="bg-blue-100 rounded-xl">
        <img src={picture} alt="" className={styles.imageProduct}/>
      </div>
      <div className="mt-2">
        <h3 className={styles.nameProduct}>{name}</h3>
      </div>
      <p className={styles.descriptionProduct}>{description}</p>
      <div className="flex mt-1 flex-row">
        <button
          onClick={addProduct}
          className={styles.buttonAdd}
        >
          +
        </button>
        {isProductSelected && (
          <button
            onClick={removeProduct}
            className={styles.buttonRemove}
          >
            -
          </button>
        )}
        <div className={styles.priceProduct}>${price}</div>
      </div>
    </div>
  );
}
