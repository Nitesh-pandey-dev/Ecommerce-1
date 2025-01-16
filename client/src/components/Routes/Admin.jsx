import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/Context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
import Spinner from "../Spinner";

const AdminCheck = () => {
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useContext(AuthContext);
    useEffect(()=>{
        const check = async() => {
            const res = await axios.get('http://127.0.0.1:5000/users/admindashboard',{headers:{token:auth?.token}});
            if(res.data.ok){
                setOk(true);
                toast.success(res.data.message);
            }
            else{
                setOk(false);
                toast.error(res.data.message);
            }
        }
        if(auth?.token) check();
    },[auth?.token])
    return ok?<Outlet />:<Spinner />
};
export default AdminCheck;
