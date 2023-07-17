import Navbar from "./Navbar";
import {useContext, useEffect, useState} from "react";
import {ProductsContext} from "./ProductsContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";





export default function Layout({children}) {
  const {setSelectedProducts} = useContext(ProductsContext);
  const [success,setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes('success')) {
      setSelectedProducts([]);
      setSuccess(true);
      toast.success('Pago recibido');
    }else if (window.location.href.includes('error')){
      toast.error('Hubo un error, intente nuevamente');
    }
  }, [setSelectedProducts]);
  return (
    <div>
      <Navbar/>
      <div className="p-5 bg-white">
        {children}
      </div>
      <ToastContainer position="top-center" theme="colored" pauseOnHover={true} autoClose={10000}
      toastClassName={`w-[300px] m-auto mt-12 rounded-[10px]`} closeButton={false}/>
      <Footer/>
    </div>

  );
}