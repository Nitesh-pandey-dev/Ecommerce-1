import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Aboutpage from './pages/Aboutpage'
import Contactpage from './pages/Contactpage'
import Policypage from './pages/Policypage'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/User/Dashboard'
import Private from './components/Routes/Private'
import ForgetPassword from './pages/Auth/ForgetPassword'
import AdminCheck from './components/Routes/Admin'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import CreateCategory from './pages/AdminDashboard/CreateCategory'
import CreateProduct from './pages/AdminDashboard/CreateProduct'
import Users from './pages/AdminDashboard/Users'
import Profile from './pages/User/Profile'
import Orders from './pages/User/Orders'
import Products from './pages/AdminDashboard/Products'
import UpdateProduct from './pages/AdminDashboard/UpdateProduct'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CartPage from './pages/CartPage'
import GetOrders from './pages/AdminDashboard/GetOrders'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/productdetails/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/category/:id' element={<Categories />} />
      <Route path='/about' element={<Aboutpage />} />
      <Route path='/contact' element={<Contactpage />} />
      <Route path='/policy' element={<Policypage />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgetpassword' element={<ForgetPassword />} />
      <Route path='/dashboard/' element={<Private/>}>
        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile' element={<Profile />} />
        <Route path='user/orders' element={<Orders />} />
      </Route>
      <Route path='/dashboard/' element={<AdminCheck/>}>
        <Route path='admin' element={<AdminDashboard />} />
        <Route path='admin/createcategory' element={<CreateCategory />} />
        <Route path='admin/createproduct' element={<CreateProduct />} />
        <Route path='admin/updateproduct/:id' element={<UpdateProduct />} />
        <Route path='admin/getorders' element={<GetOrders />} />
        <Route path='admin/products' element={<Products />} />
        <Route path='admin/users' element={<Users />} />
      </Route>
      <Route path='*' element={<Pagenotfound />} />
    </Routes>
    </>
  )
}

export default App