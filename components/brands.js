import { Bierzo, Doncandido, Piamontesa, Serenisima, Tremblay } from "@/public/assets"

export default function Brands (){
    
    const marcas = [Bierzo,Doncandido,Serenisima,Piamontesa,Tremblay];
    return(
    <div className="
    
    flex flex-col items-center bg-white
    sm:justify-center ">
        <div className="flex">
        <span className="
        text-2xl my-4 text-gray-800 font-semibold 
        sm:text-4xl"> 
            Marcas que confian en nosotros!
        </span>
        </div>
        <div className="
        flex flex-wrap items-center justify-center mt-5 mb-10
        sm:my-12 sm:flex-nowrap">
        {marcas.map((logo) =>(
            <img src={logo} alt="marcas" className="
            
            
            flex w-[120px] mx-2 py-4
            sm:w-[300px] sm:h-[130px] sm:object-contain sm:mx-6 sm:mix-blend-color-normal" />
        ))}
        </div>
    </div>
)}
