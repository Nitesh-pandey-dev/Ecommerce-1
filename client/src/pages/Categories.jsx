import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Cartcontext } from "../components/context/Cart";
import toast from "react-hot-toast";

const Categories = () => {
  const params = useParams();
  const [cart,setCart] = useContext(Cartcontext);
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/product/catproduct/${params.id}`
      );
      setProduct(res?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(params.id) getProduct();
  }, [params.id]);
  return (
    <Layout>
        <h3 className="text-center mt-3">{`${product.length} Product Found`}</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="d-flex flex-wrap">
           {product?.map((item,index)=>(
             <div className="card ms-2" style={{ width: "18rem" }}>
             <img
               src={`http://localhost:5000/uploads/${item.photo}`}
               className="card-img-top"
               alt="..."
             />
             <div className="card-body">
               <h5 className="card-title">{item.name}</h5>
               <p className="card-text">{item.description}</p>
               <button className="btn btn-secondary" onClick={()=>{setCart([...cart,item]);toast.success("Item Added To Cart!!")}}>Add To Cart</button>
             </div>
           </div>
           ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
