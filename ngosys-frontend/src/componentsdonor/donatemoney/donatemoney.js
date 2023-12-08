import React, { useState, useEffect, useReducer } from "react";
import "./donatemoney.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../commoncomponent/navbardon/navbar";

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
    <div className="donatemoneyDiv">
      <Navbar/>
      <div className="row donNGO">
        {ngodata.map(ngo => (
          <>
            <div key={ngo._id} className="cardDon container">
              <div className="card-body">
                <h5 className="title">{ngo.name}</h5>
                <p className="text"><b>Address:</b> {ngo.address}</p>
                <p className="text"><b>Contact:</b> {ngo.pnumber}</p>
                <p className="text"><b>City:</b> {ngo.city}</p>
                <p className="text"><b>Email:</b> {ngo.email}</p>
                <p className="text"><b>State:</b> {ngo.state}</p>
                <p className="text"><b>UPI:</b> {ngo.NGOID}</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p></p>
                <button className="btn mx-0"onClick={() => displayRazorpay(ngo)} style={{marginTop: '2%'}}>Donate</button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Donatemoney
