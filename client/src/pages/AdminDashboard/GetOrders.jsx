import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { AuthContext } from '../../components/context/Context';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';

const GetOrders = () => {
    const [status,setStatus] = useState(["Shipped","Delivered","Not Process","Cancel"]);
    const [changeStatus,setChangeStatus] = useState("");
    const [auth,setAuth] = useContext(AuthContext);
    const [orders,setOrders] = useState([]);
    const handleChange = async(value,id) => {
        // console.log(value)
        try {
            const res = await axios.get(`http://127.0.0.1:5000/product/updatestatus/${id}/${value}`,{headers:{token:auth?.token}});
            console.log(res.data);
            getOrders();
        } catch (error) {
            console.log(error)
        }
    }
    const getOrders = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/product/allorders',{headers:{token:auth?.token}});
            // console.log(res.data);
            setOrders(res.data.orders);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getOrders()
    },[])
  return (
    <Layout>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Orders</h1>
                {orders?.map((item,index)=>{
                        return(
                        <div className="border-shadow">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Buyer</th>
                                        <th scope='col'>Orders</th>
                                        <th scope='col'>Payments</th>
                                        <th scope='col'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>
                                            <Select bordered={false} onChange={(value)=>handleChange(value,item._id)} defaultValue={item?.status}>
                                                {status?.map((i,index)=>(
                                                    <Option key={index} value={i}>{i}</Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td>{item?.username}</td>
                                        <td>{moment(item.createdAt).fromNow()}</td>
                                        <td>{item.payment?"Success":"Failed"}</td>
                                        <td>{item.products.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container">
                                {item?.products?.map((item,index)=>(
                                    <div className="row mb-2 card flex-row p-2">
                                    <div className="col-md-4">
                                        <img className='w-75' src={`http://localhost:5000/uploads/${item.photo}`} alt="" />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{`Name: ${item.name}`}</p>
                                        <p>{`Price: $${item?.price}`}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        )
                    }
                    )}
            </div>
        </div>
    </Layout>
  )
}

export default GetOrders