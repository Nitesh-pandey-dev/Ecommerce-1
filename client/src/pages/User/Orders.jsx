import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../components/context/Context';

const Orders = () => {
    const [auth,setAuth] = useContext(AuthContext);
    const [orders,setOrders] = useState([]);
    const getOrders = async() => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/product/getorders',{headers:{token:auth?.token}});
            setOrders(res.data.orders);
            // console.log(res.data.orders)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getOrders()
    },[])
  return (
    <Layout>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                    {orders.map((item,index)=>{
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
                                        <td>{item.status}</td>
                                        <td>{auth?.user}</td>
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
        </div>
    </Layout>
  )
}

export default Orders