import React, { useState, useEffect, useReducer } from "react";
import "./donatemoney.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../firstpage//images/output-onlinepngtools.png";
import img2 from "../../firstpage//images/bg.jpg";
import img3 from "../../firstpage//images/NGO_MANAGE.png";
import "antd/dist/antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../commoncomponent/footer/footer2/footer2";
import Googlemap from "../../commoncomponent/Googlemap/googlemap";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Donatemoney = () => {

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [ngodata, setNgodata] = useState([]);

  //logout button
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRegUser");
    history.push("/")
  }

  useEffect(() => {
    fetchAllNgo();
  }, []);

  const fetchAllNgo = async () => {
    try {
      const response = await fetch('http://localhost:9002/getallngo', {
        method: 'GET'
      });
      const data = await response.json();
      setNgodata(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  async function displayRazorpay(ngo) {
    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
      }

      const data = await fetch('http://localhost:9002/razorpay', { method: 'POST' }).then((t) =>
        t.json()
      )

      console.log(data)

      const options = {
        key: 'rzp_test_J2At7yvYLkugJD',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: ngo.name,
        description: 'Thank you for Donation.',
        handler: async function (response) {
          alert(response.razorpay_payment_id)
				  alert(response.razorpay_order_id)
				  alert(response.razorpay_signature)
          const transactionData = {
            ngoId: ngo._id,
            userId: user.user._id,
            amount: 1000, // Set your desired amount here
            date: new Date().toISOString(),
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const transactionResponse = await axios.post('http://localhost:9002/savetransaction', transactionData);
            console.log(transactionResponse.data); // Log or handle the response as needed
          } catch (error) {
            console.error('Error saving transaction:', error.message);
          }

          alert('Donation successful!');
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error in displayRazorpay:', error.message);
    }
  }

  return (
    <div className="donatemoney">

      <div className="mainheaderdon">
        <div className="logo">
          <a href="/"><img src={img1} alt="logo"></img></a>
        </div>

        <nav>
          <a href="/homepagedonor">Home</a>
          {/* <a href="/contactus">Contact</a> */}
          <a onClick={() => history.push("/updatedon")} style={{ cursor: "pointer" }}>Update Profile </a>
          <a onClick={() => history.push("/viewtrans")} style={{ cursor: "pointer" }}>View Transections </a>
          {/* <a style={{ cursor: 'pointer' }} onClick={() => history.push("/registeredevents")} >Registered Events</a> */}
          <button className="btn btn-outline-danger " onClick={logout}>Logout</button>

        </nav>
      </div>

      <div className="ngodata" align="center" >
        <br></br>
        {ngodata.map(ngo => (
          <>
            <div key={ngo._id} className="card" style={{ width: "800px" }}>
              <div className="card-body">
                <table style={{ border: 2, width: "500px" }}>
                  <tr>
                    <td colSpan={3}><b><h5 className="card-title">{ngo.name}</h5></b></td>
                  </tr>
                  <tr>
                    <td><p className="card-text"><b>Address:</b> {ngo.address}</p></td>
                    <td><p className="card-text"><b>Contact:</b> {ngo.pnumber}</p></td>
                  </tr>
                  <tr>
                    <td><p className="card-text"><b>City:</b> {ngo.city}</p></td>
                    <td><p className="card-text"><b>Email:</b> {ngo.email}</p></td>
                    <td rowSpan={3}><button className="btn btn-primary" onClick={() => displayRazorpay(ngo)}>Donate</button></td>
                  </tr>
                  <tr>
                    <td><p className="card-text"><b>State:</b> {ngo.state}</p></td>
                    <td><p className="card-text"><b>UPI:</b> {ngo.NGOID}</p></td>
                  </tr>
                </table>
              </div>
            </div>
            <br></br>
          </>
        ))}
      </div>

    </div>
  )
}

export default Donatemoney
