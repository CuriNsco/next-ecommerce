import { useContext } from "react";
import { ProductsContext } from "../components/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "./constants";
import Image from "next/image";
import modules from "@/styles.modules";

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  const lastIndex = navLinks.length - 1;
  const lastNavLinks = navLinks[lastIndex];
  const { selectedProducts = [] } = useContext(ProductsContext);
  const cartItemCount = selectedProducts.length;

  return (
    <nav className="sticky top-0 bg-white p-5 w-full flex border-t border-gray-200 justify-center space-x-12 text-gray-400 z-10">
      <Image src="/products/cartelsinfondo.png" alt="Cartel" width={200} height={100} />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
              path === item.url ? "text-[#0d2f3f]" : "text-gray-400"
            } ${index === lastIndex ? "mr-0" : "mr-10"}`}
          >
            {index === lastIndex ? (
              <Link href={lastNavLinks.url} className="sm:flex sm:px-2 sm:font-roboto sm:text-md sm:px-4 sm:text-[#0d2f3f] sm:font-[550] sm:mx-2 sm:my-4">
                {lastNavLinks.label}
                {cartItemCount > 0 && (
                  <span className="ml-1 text-sm font-semibold bg-red-500 text-white px-2 py-1 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link href={item.url} className="sm:flex sm:px-2 sm:font-roboto sm:text-md sm:px-4 sm:text-[#0d2f3f] sm:font-[550] sm:mx-2 sm:my-4">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
