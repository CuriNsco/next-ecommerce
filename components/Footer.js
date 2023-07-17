import Image from "next/image";
import { footerLinksTitle } from "./constants";
import { cartelsinfondo } from "@/public/assets";

export default function Footer() {
  return (
    <footer className="footer 
    p-5 bg-white text-base-200 ring-2 ring-gray-200 
    sm:p-10">

      <div className="flex flex-col  items-center justify-center w-full text-center sm:justify-center sm:items-start">
        <Image
          src={cartelsinfondo}
          alt="Cartel"
          width={200}
          height={100}
          className="sm:visible w-[auto] h-[auto]"
        />
        <p className="sm:mx-16">
          El Bolson, Rio Negro
          <br />
          Since 2010
        </p>
      </div>

      <div className="flex flex-row w-full h-full justify-around">
      {footerLinksTitle.map((section, index) => (
        <div key={index} className="flex flex-col items-center sm:items-start sm:space-y-1">
          <span className="footer-title">{section.label}</span>
          {section.link.map((link, linkIndex) => (
            <a key={linkIndex} className="link link-hover font-bold text-gray-800">
              {link.label}
            </a>
          ))}
        </div>
        ))}
        </div>

    </footer>
  );
}
