import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import SearchBar from "@/components/Searchbar";


export default function Quesos({ products }) {
  const [phrase, setPhrase] = useState("");

  let embutidosProducts = products.filter((product) => product.category === "embutidos");

  if (phrase) {
    embutidosProducts = embutidosProducts.filter((p) =>
      p.name.toLowerCase().includes(phrase)
    );
  }

  return (
    <Layout>
      <div className="flex justify-center">
      <SearchBar value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
      </div>
      <div className="
      flex justify-center
      sm:flex  sm:mt-12">
      <h2 className="
      text-4xl py-4 capitalize font-semibold mx-4 text-center text-black
      sm:text-4xl sm:py-5 sm:capitalize sm:font-semibold ">embutidos</h2>
      </div>
          <div>
          <div className="
      flex flex-wrap justify-center 
      sm:flex sm:mx-4 sm:my-4 sm:overflow-x-scroll sm:scrollbar-hide sm:snap-x sm:flex-wrap sm:justify-center sm:mb-12">
            {embutidosProducts.map((productInfo) => (
              <div key={productInfo._id} className="sm:px-12 sm:py-4 sm:snap-start ">
                <Product {...productInfo} />
              </div>
            ))}
          </div>
          </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
