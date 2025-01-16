import { createContext, useEffect, useState } from "react";

const Cartcontext = createContext();
const Cartprovider = ({children}) => {
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const data = localStorage.getItem('cart');
        console.log(data);
        if(data) setCart(data)
    },[])
    return(
        <Cartcontext.Provider value={[cart,setCart]}>
            {children}
        </Cartcontext.Provider>
    )
}
export {Cartcontext,Cartprovider}