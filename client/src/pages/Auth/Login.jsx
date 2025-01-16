import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/Context";

const Login = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [auth,setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/users/login',{email,password});
      if(res.data.success){
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user:res.data.user.username,
          email:res.data.user.email,
          token:res.data.token,
          completeUser:res.data.user
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        setEmail(""),setPassword("");
        navigate(location.state || '/');
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Something Went Wrong",error)
    }
  };

  return (
    <Layout>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="form-control"
            />
          </div>
          <div class="flex flex-column" style={{display:'flex',gap:'10px'}}>
          <button type="submit" class="btn btn-primary" onClick={()=>navigate('/forgetpassword')}>
            Forget Password
          </button>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default Login;
