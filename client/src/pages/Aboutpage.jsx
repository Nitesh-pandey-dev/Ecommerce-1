import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Aboutpage = () => {
  return (
    <Layout>
      <div classname="contactus">
  <div classname="col-md-6" style={{width: "500px"}}>
    <img src="https://media.istockphoto.com/id/1494812295/photo/teamwork-manager-portrait-and-diversity-of-office-team-happy-about-hr-collaboration-we-are.webp?b=1&s=170667a&w=0&k=20&c=6cnpg7ioJ30NQhl4Aq2uloQyHZqQsitSM08x1DsMdFM=" alt="contactus" style={{width: "100%"}} />
  </div>
  <div classname="col-md-4" style={{width: "600px"}}>
    <h1 classname="bg-dark p-2 text-white text-center">CONTACT US</h1>
    <p classname="text-justify mt-2">
      any query and info about prodduct feel free to call anytime we 24X7
      vaialible
    </p>
    <p classname="mt-3">
      <BiMailSend> : www.help@ecommerceapp.com
      </BiMailSend></p>
    <p classname="mt-3">
      <BiPhoneCall> : 012-3456789
      </BiPhoneCall></p>
    <p classname="mt-3">
      <BiSupport> : 1800-0000-0000 (toll free)
      </BiSupport></p>
  </div>
</div>

    </Layout>
  )
}

export default Aboutpage