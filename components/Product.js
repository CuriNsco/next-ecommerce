import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import modules from "@/styles.modules";



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
        <img src={picture} alt="" className={`${modules.imageProduct}`}/>
      </div>
      <div className="mt-2">
        <h3 className={`${modules.nameProduct}`}>{name}</h3>
      </div>
      <p className={`${modules.descriptionProduct}`}>{description}</p>
      <div className="flex mt-1 flex-row">
        <button
          onClick={addProduct}
          className={`${modules.buttonAdd}`}
        >
          +
        </button>
        {isProductSelected && (
          <button
            onClick={removeProduct}
            className={`${modules.buttonRemove}`}
          >
            -
          </button>
        )}
        <div className={`${modules.priceProduct}`}>${price}</div>
      </div>
    </div>
  );
}
