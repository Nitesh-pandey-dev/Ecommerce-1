import React, { useContext, useEffect, useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import hooks from '../../hooks/hooks';
import toast from 'react-hot-toast'
import axios from 'axios';
import { Cartcontext } from '../context/Cart';
const Header = () => {
  const [auth,setAuth] = useContext(AuthContext);
  const [cart,setCart] = useContext(Cartcontext);
  const categories = hooks();
  const handleLogout = () => {
   try {
    setAuth({
      ...auth,
      user:"",
      email:"",
      token:"",
      completeUser:""
    });
    localStorage.removeItem('auth');
    toast.success("User Logged Out Successfully");
   } catch (error) {
    console.log(error);
    toast.error("Unable To Logged Out!!");
   }
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand">Ecommerce App</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link" aria-current="page">Home</Link>
        </li>
        {!auth.user?(<>
          <li className="nav-item">
          <Link to='/register' className="nav-link">Register</Link>
        </li>
        <li className="nav-item">
          <Link to='/login' className="nav-link">Login</Link>
        </li>
        </>):(<>
          <li className="nav-item dropdown">
          <Link to='' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user}
          </Link>
          <ul className="dropdown-menu">
          <li><Link to={`/dashboard/${auth?.completeUser?.role === 1 ? 'admin':'user'}`} className="dropdown-item">Dashboard</Link></li>
          <li><Link to='/login' className="dropdown-item" onClick={handleLogout}>Logout</Link></li>
          </ul>
          </li>
        </>)}

        <li className="nav-item dropdown">
          <Link to='' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu">
         {categories?.map((item,index)=>(
           <Link to={`/category/${item._id}`}><li className="dropdown-item" onClick={()=>handleCategory()}>{item.name}</li></Link>
         ))}
          </ul>
          </li>
        <li className="nav-item">
          <Link to='/cart' className="nav-link">Cart ({cart.length})</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header