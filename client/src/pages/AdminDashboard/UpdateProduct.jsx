import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { AuthContext } from "../../components/context/Context";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
    const params = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [prevPhoto,setPrevPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id,setId] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name)
      productData.append("price",price)
      productData.append("description",description)
      productData.append("quantity",quantity)
    //   productData.append("category",category)
      productData.append("shipping",shipping)
      photo && productData.append("photo",photo)
      const res = await axios.put(`http://127.0.0.1:5000/product/updateproduct/${id}`,productData,{headers:{"Content-Type":"multipart/form-data"}});
    if(res.data.success){
      toast.success(res.data.message);
      navigate('/dashboard/admin/products')
    }
    else{
      toast.error(res.data.message);
    }
    // setName("");
    // setQuantity("");
    // setPrice("")
    // setCategory("")
    // setDescription("")
    // setPhoto("")
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async(e) => {
    e.preventDefault();
    try {
        const answer = window.prompt("Are you sure?");
        if(!answer) return;
        const res = await axios.get(`http://localhost:5000/product/delete/${id}`);
        console.log(res.data.message)
        if(res.data.success){
            toast.success(res.data.message);
            navigate('/dashboard/admin/products');
        }
        else{
            console.log("Error in handleDelete Funtion");
        }
    } catch (error) {
        console.log(error.messsage)
    }
  }
  const getSingleProduct = async() => {
    try {
        const res = await axios.get(`http://127.0.0.1:5000/product/subproduct/${params.id}`);
        setName(res.data.product.name);
        setPrice(res.data.product.price);
        setPrevPhoto(res.data.product.photo);
        setId(res.data.product._id);
        setQuantity(res.data.product.quantity);
        setDescription(res.data.product.description);
        setCategory(res.data.product.category);
        setShipping(res.data.product.shipping);
    } catch (error) {
        console.log(error)
    }
  }
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/category/allcategory",
        { headers: { token: auth?.token } }
      );
      if (res.data.success) {
        setCategories(res.data.allcategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <form id="form" action="" enctype="multipart/form-data">
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category.name}
              >
                {categories.map((item, index) => (
                  <Option key={index} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label
                  htmlFor="image"
                  className="btn btn-outline-secondary col-md-12"
                >
                  {photo ? photo.name : "Update Image"}
                  <input
                    className="w-75 opacity-0"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="mb-3">
                 {photo ? (
                    <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      height={"200px"}
                      alt="product-photo"
                      className="img img-responsive"
                    />
                  </div>
                 ):(
                    <div className="text-center">
                    <img
                      src={`http://localhost:5000/uploads/${prevPhoto}`}
                      height={"200px"}
                      alt="product-photo"
                      className="img img-responsive"
                    />
                  </div>
                 )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter Product Name"
                  className="form-control mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="Enter Product Price"
                  className="form-control mb-3"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  name="quantity"
                  required
                  placeholder="Enter Product Quantity"
                  className="form-control mb-3"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <textarea
                  name=""
                  placeholder="Enter Description"
                  cols="87"
                  required
                  className="p-2 mb-3"
                  rows="2"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                ></textarea>
                  <select class="form-select" bordered={false} showSearch size={'large'} value={shipping} onChange={(e)=>setShipping(e.target.value)}>
                    <option value="1" selected>Select Shipping</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary text-center ms-2" onClick={handleUpdate}>UPDATE PRODUCT</button>
                <button type="submit" className="btn btn-danger text-center ms-2" onClick={handleDelete}>DELETE PRODUCT</button>
              </div>
              </div>
              </form>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default UpdateProduct;
