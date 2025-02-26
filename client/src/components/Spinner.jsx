import React, { useContext, useEffect, useState } from 'react'
import { useNavigate , useLocation } from 'react-router-dom';
import { AuthContext } from './context/Context';

const Spinner = () => {
    const [count,setCount] = useState(5);
    const [auth,setAuth] = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((prev)=>--prev);
        }, 1000);
        if(count === 0){
            setAuth({
                ...auth,
                user:'',
                email:'',
                token:''
            })
            localStorage.removeItem('auth');
            navigate('/login',{state:location.pathname})
        };
        return () => clearInterval(interval);
    },[count,navigate,location])
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
        <h1 className='Text-center'>Will Be Redirecting In: {count} second.</h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

    </>
  )
}

export default Spinner