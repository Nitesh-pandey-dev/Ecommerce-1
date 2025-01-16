import { useState,useEffect, useContext } from "react";
import { AuthContext } from "../context/Context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
const Private = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useContext(AuthContext);
    useEffect(()=>{
        const authCheck = async() => {
            const res = await axios.get('http://localhost:5000/users/dashboard',{headers:{token:auth?.token}});
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token]);
    return ok?<Outlet/>:<Spinner/>;
};
export default Private;