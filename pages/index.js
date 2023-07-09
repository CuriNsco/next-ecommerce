import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import Carouselpicadas from "@/components/Carouselpicadas";
import SearchBar from "@/components/Searchbar";
import modules from "@/styles.modules";


export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  let offerProducts = products.filter((p) => p.offer === 'true');

  if (phrase) {
    offerProducts = offerProducts.filter((p) =>
      p.name.toLowerCase().includes(phrase)
    );
  }

  return (
    <Layout>

      <div className="flex justify-center">
      <SearchBar value={phrase} onChange={(e) => setPhrase(e.target.value)}/>
      </div>
     

      <Carouselpicadas/>

      <div className="flex justify-center mt-12">
      <h2 className={modules.h2ProductsName}>Ofertas de la semana</h2>
      </div>

      <div className={modules.divProducts}>
        {offerProducts.map((productInfo) => (
          <div key={productInfo._id} className={modules.productsOrder}>
            <Product {...productInfo} />
          </div>
        ))}
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
