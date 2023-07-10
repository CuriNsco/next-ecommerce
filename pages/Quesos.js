import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import SearchBar from "@/components/Searchbar";

export default function Quesos({ products }) {
  const [phrase, setPhrase] = useState("");

  let quesosProducts = products.filter((product) => product.category === "quesos");

  if (phrase) {
    quesosProducts = quesosProducts.filter((p) =>
      p.name.toLowerCase().includes(phrase)
    );
  }

  return (
    <Layout>
     <div className="flex justify-center">
      <SearchBar value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
      </div>
          <div className=" mx-12 flex justify-center">
          <h2 className="text-4xl py-5 capitalize font-semibold">Quesos</h2>
          </div>
            <div>
              <div  className="flex mx-4 my-4 overflow-x-scroll scrollbar-hide snap-x flex-wrap justify-center ">
                {quesosProducts.map((productInfo) => (
                  <div key={productInfo._id} className="px-12 py-4 snap-start">
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
