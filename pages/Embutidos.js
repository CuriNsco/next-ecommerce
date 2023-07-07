import { useState } from "react";
import Product from "../components/Product";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "../components/Layout";
import SearchBar from "@/components/Searchbar";
import styles from "@/styles";

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
          <div className="mx-12 flex justify-center">
          <h2 className={styles.h2ProductsName}>Embutidos</h2>
          </div>
          <div>
          <div className={styles.divProducts}>
            {embutidosProducts.map((productInfo) => (
              <div key={productInfo._id} className={styles.productsOrder}>
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
