import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Cartcontext } from '../components/context/Cart'
import DropIn from "braintree-web-drop-in-react";
import { AuthContext } from '../components/context/Context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useContext(Cartcontext);
    const [totalAmt,setTotalAmt] = useState();
    const [client,setClient] = useState("");
    const [instance,setInstance] = useState('');
    const [auth,setAuth] = useContext(AuthContext);
    const removeCartItem = async(id) => {
        try {
            let newCart = [...cart];
            let index = newCart.findIndex(e=>e._id===id);
            newCart.splice(index,1);
            setCart(newCart);
            console.log(newCart)
            localStorage.setItem('cart',JSON.stringify(newCart))
        } catch (error) {
            console.log(error)
        }
    };
    const getToken = async()=>{
        try {
            const res = await axios.get('http://127.0.0.1:5000/product/braintree/token');
            // console.log(res.data.clientToken)
            setClient(res.data.clientToken);
            // console.log(client)
        } catch (error) {
            console.log(error)
        }
    }
    const handlePayment = async()=>{
        try {
            const username = auth?.user
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post('http://127.0.0.1:5000/product/braintree/payment',{nonce,cart,username},{headers:{token:auth?.token}});
            toast.success(data.message);
            navigate('/dashboard/user/orders');
            localStorage.removeItem('cart');
            setCart([]);
            setTotalAmt();
        } catch (error) {
            console.log(error)
        }
    }
    const total = () => {
        let value = 0;
        cart.map((item)=>{
            value = value + item.price
        });
        setTotalAmt(value);
    }
    useEffect(()=>{
        if(cart) total();
    },[cart])
    useEffect(()=>{
        getToken()
    },[])
  return (
    <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className='bg-light text-center mb-1 p-2'>{`Hello ${auth?.user}`}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                {cart?.map((item,index)=>(
                    <div className="row mb-2 card flex-row p-2">
                    <div className="col-md-4">
                        <img className='w-75' src={`http://localhost:5000/uploads/${item.photo}`} alt="" />
                    </div>
                    <div className="col-md-8">
                        <p>{`Name: ${item?.name}`}</p>
                        <p>{`Price: $${item?.price}`}</p>
                        <button className='btn btn-danger' onClick={()=>removeCartItem(item._id)}>Remove</button>
                    </div>
                </div>
                ))}
                </div>
                <div className="col-md-4 text-center">
                    <h2>Cart Summary</h2>
                    <p>Total | Payment | Checkout</p>
                    <hr />
                    <h1>Total: ${totalAmt}</h1>
                    <div className="mt-2">
                    <h1>Payment</h1>
                    {!client || !cart.length ? (""):(
                        <>
                        <DropIn
                    options={{
                        authorization:client,
                        paypal:{
                            flow:'vault'
                        }
                    }}
                    onInstance={instance => setInstance(instance)} />
                        </>
                    )}
                    <button className='btn btn-primary' onClick={handlePayment}>Make Payment</button>
                </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage