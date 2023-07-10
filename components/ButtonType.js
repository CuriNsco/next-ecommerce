import modules from "@/styles.modules";
import { useState } from "react";

export default function ButtonType(){
    const [selectionType,setSelectionType] = useState('feta');

    return(
        <div className="flex">
            <button onClick={() => setSelectionType('feta')}
                    className={`${selectionType === 'feta' ? 'bg-green-500' : 'bg-gray-200'} py-1 px-3 rounded-xl shadow-300 shadow-lg font-semibold my-2 mr-2`}>
                      feta
            </button>

             <button
                    onClick={() => setSelectionType("trozo")}
                    className={`${ selectionType === "trozo" ? "bg-green-500" :
                    "bg-gray-200"} py-1 px-3 rounded-xl shadow-300 shadow-lg font-semibold my-2 mr-2 `} > 
                    trozo
            </button>
            
        </div>

    );
}
