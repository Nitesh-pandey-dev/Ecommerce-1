import axios from "axios";
import { useState,useContext,useEffect,createContext } from "react";
const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({user:"",email:"",token:"",completeUser:""});
    // axios.defaults.headers.common['Authorization'] = auth?.token;
    useEffect(() => {
        const data = localStorage.getItem('auth');
        if(data){
            let parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user.username,
                email:parseData.user.email,
                token:parseData.token,
                completeUser:parseData.user
            })
        }
    }, [])
    
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider,AuthContext};