import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";

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
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-200 w-full py-2 px-4 rounded-xl"
      />
      <div>
        <div>
          <h2 className="text-2xl py-5 capitalize">Embutidos</h2>
          <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
            {embutidosProducts.map((productInfo) => (
              <div key={productInfo._id} className="px-5 snap-start">
                <Product {...productInfo} />
              </div>
            ))}
          </div>
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
