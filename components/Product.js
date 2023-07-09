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
        <img src={picture} alt="" className="w-48 h-48 rounded-xl object-cover"/>
      </div>
      <div className="mt-2">
        <h3 className={modules.nameProduct}>{name}</h3>
      </div>
      <p className={modules.descriptionProduct}>{description}</p>
      <div className="flex mt-1 flex-row">
        <button
          onClick={addProduct}
          className="bg-blue-400 text-white py-1 px-3 rounded-xl mr-2"
        >
          +
        </button>
        {isProductSelected && (
          <button
            onClick={removeProduct}
            className="bg-red-500 text-white py-1 px-3 rounded-xl"
          >
            -
          </button>
        )}
        <div className="text-2xl font-bold mt-2 ml-12">${price}</div>
      </div>
    </div>
  );
}
