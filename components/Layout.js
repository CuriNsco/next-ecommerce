import Navbar from "./Navbar";
import {useContext, useEffect, useState} from "react";
import {ProductsContext} from "./ProductsContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="p-5">
        {children}
      </div>
      <ToastContainer position="top-center" theme="colored" pauseOnHover={false}/>
    </div>
  );
}