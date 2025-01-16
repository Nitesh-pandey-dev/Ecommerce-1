import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const Register = () => {
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [favsport,setFavsport] = useState("");
    const [role,setRole] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users/register',{username,email,password,phone,address,favsport,role});
            if(res.data.success){
                toast.success("User Registered Successfully!!")
                console.log(res.data.message);
                setUsername(""),setPassword(""),setEmail(""),setFavsport(""),setPhone(""),setAddress("");
                navigate('/login');
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Something Went Wrong",error);
        }
    }

  return (
    <Layout>
        <div className="register">
        <h1>Register</h1>
<form onSubmit={handleSubmit}>
<div className="mb-3">
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Name' required className="form-control" id="exampleInputName1"/>
</div>
<div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required className="form-control" id="exampleInputEmail1"/>
</div>
<div className="mb-3">
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required className="form-control" id="exampleInputPassword1" />
</div>
<div className="mb-3">
    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone' required className="form-control" id="exampleInputPhone1" />
</div>
<div className="mb-3">
    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Address' required className="form-control" id="exampleInputAddress1" />
</div>
<div className="mb-3">
    <input type="text" value={favsport} onChange={(e)=>setFavsport(e.target.value)} placeholder='Favsport' required className="form-control" id="exampleInputAddress1" />
</div>
<div className="mb-3">
    <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} placeholder='role' required className="form-control" id="exampleInputAddress1" />
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>

        </div>
    </Layout>
  )
}

export default Register