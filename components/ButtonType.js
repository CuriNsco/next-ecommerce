import modules from "@/styles.modules";
import { useState } from "react";

export default function ButtonType(){
    const [selectionType,setSelectionType] = useState('feta');

    return(
        <div className="flex">
            <button onClick={() => setSelectionType('feta')}
                    className={`${selectionType === 'feta' ? 'bg-green-500' : 'bg-white'} 
                    
                    mx-4 px-2 text-gray-800 font-semibold rounded-2xl shadow-500 shadow-lg
                    
                    sm:py-1 sm:px-3 sm:rounded-xl sm:shadow-300 sm:shadow-lg sm:font-semibold sm:my-2 sm:mr-2 sm:text-gray-800`}>
                      feta
            </button>

             <button
                    onClick={() => setSelectionType("trozo")}
                    className={`${ selectionType === "trozo" ? "bg-green-500" :
                    "bg-gray-200"}
                    
                    mx-2 px-2 text-gray-800 font-semibold rounded-2xl shadow-500 shadow-lg
                    
                    sm:py-1 sm:px-3 sm:rounded-xl sm:shadow-300 sm:shadow-lg sm:font-semibold sm:my-2 sm:mr-2 sm:text-gray-800`} > 
                    trozo
            </button>
            
        </div>

    );
}
