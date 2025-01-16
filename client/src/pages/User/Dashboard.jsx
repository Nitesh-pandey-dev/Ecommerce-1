import React, { useContext } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { AuthContext } from '../../components/context/Context'

const Dashboard = () => {
  const [auth,setAuth] = useContext(AuthContext);
  return (
    <>
    <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>Your name: {auth?.completeUser.username}</h3>
                <h3>Your email: {auth?.completeUser.email}</h3>
                <h3>Your address: {auth?.completeUser.address}</h3>
              </div>
            </div>
          </div>
        </div>
    </Layout>
    </>
  )
}

export default Dashboard