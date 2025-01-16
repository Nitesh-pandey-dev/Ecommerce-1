import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { AuthContext } from '../components/context/Context';
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import toast from 'react-hot-toast';
import { prices } from '../components/price';
import {  useNavigate } from 'react-router-dom';
import { Cartcontext } from '../components/context/Cart';

const Homepage = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useContext(Cartcontext);
  const [auth,setAuth] = useContext(AuthContext);
  const [product,setProduct] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([]);
  const getAllProducts = async() => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/product/getproducts');
      // console.log(res.data)
      if(res.data.success){
        setProduct(res.data.products);
      }
      else{
        toast.error(res.data.message);
        console.log("Unable to get the products");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAllCategories = async() => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/category/allcategory');
      if(res.data.success){
        setCategories(res.data.allcategory);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleFilter = async(value,id) => {
    let all = [...checked];
    if(value){
      all.push(id);
    }
    else{
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  }
  const filteredProducts = async()=>{
    try {
      const res = await axios.post('http://127.0.0.1:5000/product/productfilter',{checked,radio});
      console.log(res.data)
      if(res.data.success) { 
        setProduct(res.data.products);
      }
      else{
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(checked.length || radio.length){
      filteredProducts();
      console.log("Filtered")
    }
    else if(!checked.length || !radio.length){
      getAllCategories();
      getAllProducts();
      console.log("All Categories");
    }
  },[checked,radio])
  return (
    <Layout>
      <div className=" container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className='text-center'>Filter By Category</h4>
          <div className="d-flex flex-column">
          {categories.map((item,index)=>(
            <Checkbox key={index} onChange={(e)=>handleFilter(e.target.checked,item._id)}>{item.name}</Checkbox>
          ))}
          </div>
          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className="d-flex flex-column">
          <Radio.Group className='d-flex flex-column'>
            {prices?.map((item,index)=>(
              <Radio key={index} value={item.array} onChange={(e)=>setRadio(e.target.value)}>{item.name}</Radio>
            ))}
          </Radio.Group>
          </div>  
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={()=> window.location.reload()}>Reset Filters</button>
          </div>
        </div>          
        <div className="col-md-9">
        <h1 className='text-center'>All Poducts</h1>
        <div className="d-flex flex-wrap">
          {product?.map((item,index)=>(
            <div className="card m-1" style={{ width: "18rem" }}>
             <img src={`http://localhost:5000/uploads/${item.photo}`} className="card-img-top" alt={item.name} />
             <div className="card-body">
               <h5 className="card-title d-inline-block">{item.name}</h5><span className='ms-5'>${item.price}</span>
               <p className="card-text">
                {item.description.substring(0,30)}
               </p>
               <button className='btn btn-primary ms-1' onClick={()=>navigate(`/productdetails/${item._id}`)}>More Details</button>
               <button className='btn btn-secondary ms-1' onClick={()=>{setCart([...cart,item]);localStorage.setItem('cart',JSON.stringify([...cart,item]));toast.success("Item Added To Cart!!")}}>Add To Cart</button>
             </div>
           </div>
          ))}
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage