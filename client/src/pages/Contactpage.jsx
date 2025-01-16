import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
<Layout title={"Contact us"}>
<div classname="contactus">
  <div classname="col-md-6" style={{width:"500px"}}>
    <img src="https://st4.depositphotos.com/2903611/29109/i/450/depositphotos_291092974-stock-photo-man-touching-social-network-icons.jpg" alt="contactus" style={{width:'100%' }} />
  </div>
  <div classname="col-md-4" style={{width:'600px'}}>
    <h1 classname="bg-dark p-2 text-white text-center">CONTACT US</h1>
    <p classname="text-justify mt-2">
      any query and info about prodduct feel free to call anytime we 24X7
      vaialible
    </p>
    <p classname="mt-3">
      <bimailsend> : www.help@ecommerceapp.com
      </bimailsend></p>
    <p classname="mt-3">
      <biphonecall> : 012-3456789
      </biphonecall></p>
    <p classname="mt-3">
      <bisupport> : 1800-0000-0000 (toll free)
      </bisupport></p>
  </div>
</div>

    </Layout>
  );
};

export default Contact;