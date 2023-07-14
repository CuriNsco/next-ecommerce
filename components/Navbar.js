import { useContext, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "./constants";
import Image from "next/image";
import { close, menu, cart } from "../public/assets";

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  const lastIndex = navLinks.length - 1;
  const lastNavLinks = navLinks[lastIndex];
  const { selectedProducts = [] } = useContext(ProductsContext);
  const cartItemCount = selectedProducts.length;

  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="sticky top-0 bg-white p-5 w-full flex border-t border-gray-200 justify-center space-x-12 text-gray-400 z-10 shadow-300 shadow-lg text-center">
      <div className="w-72 h-full flex justify-end">
      <Image src="/products/cartelsinfondo.png" alt="Cartel" width={200} height={100} className="w-auto h-auto" />
      </div>

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

      {/* Tres líneas de la navbar */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div className="relative"> </div>
        <Image
          src={toggle ? close : menu}
          alt="menu"
          width={28}
          height={28}
          className="object-contain mr-4"
          onClick={() => setToggle(!toggle)}
        />
        {cartItemCount > 0 && (
            <div className="absolute top- left-5  bg-red-500  w-6 h-6 flex  justify-center items-center text-black text-sm w-[50px] h-[30px] rounded-full">
              <Image src={cart} alt="cart" width={22} height={22}/>
              {cartItemCount}
            </div>
        )}

        {/* Info de la navbar chica */}
        <div className={`${!toggle ? "hidden" : "flex"}
         p-6 bg-gray-200  absolute top-20 mx-2 my-2 w-full  z-10 -mr-5
         
         `}>
          <ul className="list-none flex justify-end items-center flex-1 flex-col">
            {navLinks.map((item, index) => (
              <li
                key={item.url}
                className={`font-roboto font-semibold cursor-pointer text-[20px] ${
                  index=== lastIndex ? "text-gray-900" : "text-gray-900"
                } ${index === lastIndex.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(item.label)}
              >
                <a href={`${item.url}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
