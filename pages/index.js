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
      <h2 className="text-4xl py-5 capitalize font-semibold">Ofertas de la semana</h2>
      </div>

      <div className="flex mx-12 my-4 overflow-x-scroll scrollbar-hide snap-x flex-wrap justify-center">
        {offerProducts.map((productInfo) => (
          <div key={productInfo._id} className="px-12 py-4 snap-start">
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
