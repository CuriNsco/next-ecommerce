import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";


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
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder={"Search for products... " }
        className="bg-gray-200 w-full py-2 px-4 rounded-xl "
      />

      <div className="flex mx-12 mt-12 -mx-5 overflow-x-scroll snap-x scrollbar-hide justify-center flex-wrap flex-row">
        {offerProducts.map((productInfo) => (
          <div key={productInfo._id} className="px-5 py-12  snap-start">
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
