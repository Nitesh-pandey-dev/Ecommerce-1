import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import {Modal} from 'antd';
import { AuthContext } from '../../components/context/Context';
import CategoryForm from '../../components/Form/CategoryForm';

const CreateCategory = () => {
  const [auth,setAuth] = useContext(AuthContext);
  const [category,setCategory] = useState([]);
  const [name,setName] = useState("");
  const [selected,setSelected] = useState(null);
  const [updatedName,setUpdatedName] = useState("");
  const[visible,setVisible] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/category/createcategory',{name});
      if(res.data.success){
        toast.success(`${res.data.category.name} created`);
        getAllCategory()
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://127.0.0.1:5000/category/updatecategory/${selected?._id}`,{name:updatedName});
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } catch (error) {
      console.log(error.message);
    }
  }
  const handleDelete = async(item) => {
   try {
    const res = await axios.delete(`http://127.0.0.1:5000/category/deletecategory/${item._id}`);
    toast.success(`${item.name} deleted successfully!`);
    setSelected(null);
    setUpdatedName("");
    setVisible(false);
    getAllCategory();
   } catch (error) {
    console.log(error)
   }
  }
  const getAllCategory = async() => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/category/allcategory',{headers:{token:auth?.token}});
      if(res.data.success){
        setCategory(res.data.allcategory)
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong in getting category");
    }
  }
  useEffect(()=>{
    getAllCategory()
  },[])
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1>Manage Category</h1>
                <div className="p-3 w-50">
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                </div>
                <div className='w-75'>
               <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
      {
        category?.map((item,index)=>(
          <>
          <tr>
          <td key={index}>{item.name}</td>
          <td>
            <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true);setUpdatedName(item.name);setSelected(item)}}>Edit</button>
            <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(item)}}>Delete</button>
          </td>
          </tr>
          </>
        ))
      }
  </tbody>
</table>
                </div>
                <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}><CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} /></Modal>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory