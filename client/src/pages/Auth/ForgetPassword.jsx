import React, { useContext, useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/Context";

const ForgetPassword = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [auth,setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [favsport, setFavsport] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/users/forgetpassword',{email,favsport,newpassword});
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
        setEmail(""),setNewpassword(""),setFavsport("");
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
              placeholder="New Password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <input
              type="text"
              placeholder="Fav Sport"
              value={favsport}
              onChange={(e) => setFavsport(e.target.value)}
              class="form-control"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default ForgetPassword;
// $2b$10$beEa1xCCs6eIKDFl6Pr9UunZQG7PpTZzPkck3WPyF0FXXIoT1mf1m
// $2b$10$beEa1xCCs6eIKDFl6Pr9UunZQG7PpTZzPkck3WPyF0FXXIoT1mf1m