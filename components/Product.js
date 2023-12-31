import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import Image from "next/image";



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
    <div className="bg-gray-100 rounded-xl flex justify-center mt-4 mx-2 clamp-2 h-[280px] sm:h-full sm:w-[300px] items-center ">

      <div className="flex flex-col object-cover object-center
      w-[138px] my-2 mx-4 py-2 text-center items-center
      sm:rounded-xl sm:w-[200px]">

        <Image src={picture} alt="producto" width={192} height={192}  className="flex w-[150px] h-[150px] rounded-xl 
        sm:rounded-xl sm:object-cover"/>

      <div className="mt-4 
      sm:mt-2">
        <h3 className="
        font-semibold
        text-black
        text-lg
        sm:font-bold sm:text-lg sm:text-black">{name}</h3>
      </div>

      <p className="hidden sm:flex sm:py-0 sm:block  sm:text-sm sm:mt-1 sm:leading-4 sm:text-gray-500 sm:clamp-2 sm:w-[200px] sm:h-[160px] ">{description}</p>

      <div className="py-2 flex
       sm:flex sm:mt-1 sm:flex-row">
                          {/* button plus */}
        <button
          onClick={addProduct}
          className="
          bg-green-500 text-black py-1 px-3 rounded-full mx-2
          sm:mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>

        </button>
        {isProductSelected && (

                            // button minus
          
          <button
            onClick={removeProduct}
            className="
            bg-red-500 text-black py-1 px-3 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/ svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>

          </button>
        )}

        <div className="
        font-semibold text-black text-xl mx-1
        sm:text-2xl sm:font-bold sm:mt-2 sm:ml-12  sm:flex sm:items-center">${price}
        <span className="flex font-light text-xs">
                       /100grs
        </span>
        </div>

      </div>
      </div>


    </div>
  );
}
