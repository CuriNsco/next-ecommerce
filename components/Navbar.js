import { useContext, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "./constants";
import Image from "next/image";
import modules from "@/styles.modules";
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
    <nav className={`${modules.contPrincipalNav}`}>
      <Image src="/products/cartelsinfondo.png" alt="Cartel" width={200} height={100}  className="invisible sm:visible"/>
      <ul className={`${modules.ulNav}`}>
        {navLinks.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer ${
              path === item.url ? "text-[#0d2f3f]" : "text-gray-400"
            } ${index === lastIndex ? "mr-0" : "mr-10"}`}
          >
            {index === lastIndex ? (
              <Link href={lastNavLinks.url} className={`${modules.linkCarritoNavbar}`}>
                {lastNavLinks.label}
                {cartItemCount > 0 && (
                  <span className={`${modules.counterCart}`}>
                    {cartItemCount}
                  </span>
                )}
              </Link>
            ) : (
              <Link href={item.url} className={`${modules.linksNavbar}`}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Tres líneas de la navbar */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <div className="relative"> </div>
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain mr-4"
          onClick={() => setToggle(!toggle)}
        />
        {cartItemCount > 0 && (
            <div className="absolute top-10 -right-4 bg-red-500  w-6 h-6 flex justify-center items-center text-black text-sm w-[50px] h-[30px] rounded-xl">
              <img src={cart} alt="cart" className="w-[22px] h-[22px]"/>
              {cartItemCount}
            </div>
        )}

        {/* Info de la navbar chica */}
        <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-[#0d2f3f] absolute top-20 mx-2 my-2 min-w-[340px] rounded-xl sidebar z-10`}>
          <ul className="list-none flex justify-end items-center flex-1 flex-col">
            {navLinks.map((item, index) => (
              <li
                key={item.url}
                className={`font-roboto font-semibold cursor-pointer text-[16px] ${
                  index=== lastIndex ? "text-white" : "text-[#f8f7f1]"
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
