import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Cartcontext } from '../components/context/Cart';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart,setCart] = useContext(Cartcontext);
  const [product,setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);
  useEffect(()=>{
    getProduct();
  },[])
  const getProduct = async()=>{
    try {
      const res = await axios.get(`http://127.0.0.1:5000/product/subproduct/${params.id}`)
      setProduct(res.data.product);
      getSimilarProduct(res.data.product._id,res.data.product.category._id);
    } catch (error) {
      console.log(error)
    };
  }
  const getSimilarProduct = async(pid,cid)=>{
    try {
      const {data} = await axios.get(`http://127.0.0.1:5000/product/relatedproducts/${pid}/${cid}`);
      setRelatedProducts(data?.relatedProduct);
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-5 mt-4">
          <img className='w-100' src={`http://localhost:5000/uploads/${product.photo}`} alt="" />
        </div>
        <div className="col-md-7">
          <h1>Product Detail</h1>
          <h6>Name: {product.name}</h6>
          <h6>Price: ${product.price}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Shipping: {product.shipping}</h6>
          <button className='btn btn-secondary' onClick={()=>{setCart([...cart,product]);navigate('/cart')}}>Add To Cart</button>
        </div>
      </div>
      <div className="row">
        <h1>Similar Products</h1>
        {relatedProducts.length === 0 && <p>No Similar Products Available</p>}
        <div className="d-flex flex-wrap">
        {relatedProducts?.map((item,index) => (
          <div className="card ms-2" style={{width: '18rem'}}>
  <img src={`http://localhost:5000/uploads/${item.photo}`} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item.name}</h5>
    <p className="card-text">{item.description}</p>
    <button className='btn btn-secondary' onClick={()=>{setCart([...cart,item]);toast.success("Item Added To Cart")}}>Add To Cart</button>
  </div>
</div>

        ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails