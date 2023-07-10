import { useState } from "react";
import Image from "next/image";

export default function Formcheckout(){

const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [number, setNumber] = useState('');

return(
<div className="mt-8 flex rounded-xl bg-gray-200">  
      <div className="flex flex-col w-full items-center justify-center px-12">
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-white w-full rounded-lg px-4 py-2 mb-2 text-center"type="text" placeholder="Calle y numero" required/>

          <input name="city" value={city} onChange={e => setCity(e.target.value)}  className="bg-white w-full rounded-lg px-4 py-2 mb-2 text-center" type="text" placeholder="Referencias ej: porton verde" required/>

          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-white w-full rounded-lg px-4 py-2 mb-2 text-center" type="text" placeholder="Nombre completo" required/>

          <input name="email" value={email} onChange={e => setEmail(e.target.value)}  className="bg-white w-full rounded-lg px-4 py-2 mb-2 text-center" type="email" placeholder="Email" required/>

          <input name="number" value={number} onChange={e => setNumber(e.target.value)}  className="bg-white w-full rounded-lg px-4 py-2 mb-2 text-center" type="number" placeholder="Telefono" maxLength={'11'} required/>

          </div>
        <div className="flex justify-center items-center rounded-xl">
          <Image src='/products/fotoinput.jpg' alt="Fiambreria Maradona" width={800} height={800} className="rounded-2xl py-4 px-4"/>
        </div>
        </div>
);

}