import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import SearchBar from "@/components/Searchbar";
import modules from "@/styles.modules";

export default function Fiambres({ products }) {
  const [phrase, setPhrase] = useState("");

  let fiambresProducts = products.filter((product) => product.category === "fiambres");

  if (phrase) {
    fiambresProducts = fiambresProducts.filter((p) =>
      p.name.toLowerCase().includes(phrase)
    );
  }

  return (
    <Layout>
      <div className="flex justify-center">
      <SearchBar value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
      </div>
        <div className=" mx-12 flex justify-center">
      <h2 className={modules.h2ProductsName}>Fiambres</h2>
      </div>
          <div>
            <div className={modules.divProducts}>
              {fiambresProducts.map((productInfo) => (
                <div key={productInfo._id} className={modules.productsOrder}>
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
