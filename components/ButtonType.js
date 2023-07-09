import modules from "@/styles.modules";
import { useState } from "react";

export default function ButtonType(){
    const [selectionType,setSelectionType] = useState('feta');

    return(
        <div className="flex">
            <button onClick={() => setSelectionType('feta')}
                    className={`${selectionType === 'feta' ? 'bg-emerald-500' : 'bg-gray-200'} ${modules.typeButton}`}>
                      feta
            </button>

             <button
                    onClick={() => setSelectionType("trozo")}
                    className={`${ selectionType === "trozo" ? "bg-emerald-500" :
                    "bg-gray-200"} ${modules.typeButton} `} >
                    trozo
            </button>
            
        </div>

    );
}