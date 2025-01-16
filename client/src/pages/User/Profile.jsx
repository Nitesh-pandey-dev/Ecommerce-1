import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../components/context/Context';

const Profile = () => {
  const [auth,setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    useEffect(()=>{
      console.log(auth)
      const newAuth = auth?.completeUser;
      setUsername(newAuth.username);
      setEmail(newAuth?.email);
      setPhone(newAuth?.phone);
      setAddress(newAuth?.address)
    },[])
  //   const handleSubmit = async(e) => {
  //     e.preventDefault();
  //     try {
  //         const res = await axios.post('http://localhost:5000/users/register',{username,email,password,phone,address,favsport,role});
  //         if(res.data.success){
  //             toast.success("User Registered Successfully!!")
  //             console.log(res.data.message);
  //             setUsername(""),setPassword(""),setEmail(""),setFavsport(""),setPhone(""),setAddress("");
  //             navigate('/login');
  //         }
  //         else{
  //             toast.error(res.data.message)
  //         }
  //     } catch (error) {
  //         console.log("Something Went Wrong",error);
  //     }
  // }
  return (
    <Layout>
        <div className="container-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu />
                </div>
                <div className="col-md-9">
                <form>
<div className="mb-3">
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Name' required className="form-control" id="exampleInputName1"/>
</div>
<div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required className="form-control" id="exampleInputEmail1"/>
</div>
<div className="mb-3">
    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone' required className="form-control" id="exampleInputPhone1" />
</div>
<div className="mb-3">
    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Address' required className="form-control" id="exampleInputAddress1" />
</div>
{/* <button type="submit" className="btn btn-primary">Submit</button> */}
</form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile