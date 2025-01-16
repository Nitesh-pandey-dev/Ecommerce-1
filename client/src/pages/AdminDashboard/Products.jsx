import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/product/getproducts");
      if(res.data.success){
      setProduct(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Products List</h1>
          <div className="d-flex flex-wrap">
          {product?.map((item, index) => (
           <Link key={item._id} to={`/dashboard/admin/updateproduct/${item._id}`} className="product-link">
             <div className="card m-2" style={{ width: "18rem" }}>
              <img src={`http://localhost:5000/uploads/${item.photo}`} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                 {item.description}
                </p>
              </div>
            </div>
           </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
