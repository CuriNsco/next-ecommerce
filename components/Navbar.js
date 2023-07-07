import { useContext } from "react";
import { ProductsContext } from "../components/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "./constants";
import Image from "next/image";
import styles from "@/styles";

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  const lastIndex = navLinks.length - 1;
  const lastNavLinks = navLinks[lastIndex];
  const { selectedProducts = [] } = useContext(ProductsContext);
  const cartItemCount = selectedProducts.length;

  return (
    <nav className={styles.contPrincipalNav}>
      <Image src="/products/cartelsinfondo.png" alt="Cartel" width={200} height={100} />
      <ul className={styles.ulNav}>
        {navLinks.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
              path === item.url ? "text-[#0d2f3f]" : "text-gray-400"
            } ${index === lastIndex ? "mr-0" : "mr-10"}`}
          >
            {index === lastIndex ? (
              <Link href={lastNavLinks.url} className={styles.linkCarritoNavbar}>
                {lastNavLinks.label}
                {cartItemCount > 0 && (
                  <span className={styles.counterCart}>
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link href={item.url} className={styles.linksNavbar}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
