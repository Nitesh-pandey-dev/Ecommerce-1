import React, { useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { AuthContext } from '../../components/context/Context'

const AdminDashboard = () => {
  const [auth,setAuth] = useContext(AuthContext);
  return (
    <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3>Admin name: {auth?.completeUser?.username}</h3>
            <h3>Admin email: {auth?.completeUser?.email}</h3>
            <h3>Admin contact: {auth?.completeUser?.phone}</h3>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard