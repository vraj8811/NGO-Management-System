/*eslint-disable-next-line*/

import React, { useState } from "react";
import "./thingregister.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbar";
import img1 from "../../firstpage/images/logart.png";
import Footer from "../../commoncomponent/footer/footer2/footer2";
import { Convert } from 'mongo-image-converter';

const ThingRegister = () => {
  const history = useHistory();
  const newNID = localStorage.getItem("ngoID")
  const user1 = JSON.parse(localStorage.getItem("currentUser"))
  const newDID = user1.user._id;
  const [donationInfo, setDonationInfo] = useState({
    ngoID:newNID,
    donorID:newDID,
      quantity:"",
      thingName:"",
  
  });
  const [Images, setImages] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationInfo({
      ...donationInfo,
      [name]: value,
    });
    // console.log(donationInfo);
    //  console.log(Data)   
  };
  const onImagesChange = async (e) => {
     const convertedImages = await Convert(e);
     setImages(convertedImages)
}
  const registerDonation = () => {
   
    if (
      donationInfo.thingName &&
      donationInfo.quantity 
    ) {
      const Data = JSON.stringify({ ...donationInfo, Images });
      axios
        .post("http://localhost:9002/registersThing", { Data, "Content-Type": "application/json" })
        .then((res) => alert(res.data.message));
      history.push("/donationSuccess");

     } else {
          alert("Please fill in all the required fields.");
     }
    
    //  console.log("data :: " + donationInfo.donorName);
  };
  // const [emailError, setEmailError] = useState('')
  // const [emailErrorstatus, setEmailErrorstatus] = useState('')

  // const validateEmail = (e) => {

  //     let email = e.target.value
  //     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     console.log(e)
  //     if (re.test(email)) {
  //         setEmailError('Valid Email :)')
  //         setEmailErrorstatus("false");
  //         handleChange(e);
  //     } else {
  //         setEmailError('Enter valid Email!')
  //         setEmailErrorstatus("true");

  //     }
  // }
  // const [phoneError, setPhoneError] = useState('')
  // const [phoneErrorstatus, setPhoneErrorstatus] = useState('')

  // const validatePhone = (e) => {

  //     let phone = e.target.value
  //     let re = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
  //     console.log(e)
  //     if (re.test(phone)) {
  //         setPhoneError('Valid phone no:)')
  //         setPhoneErrorstatus("false");
  //         handleChange(e);
  //     } else {
  //         setPhoneError('Enter valid phone no!')
  //         setPhoneErrorstatus("true");

  //     }
  // }

  return (
    <>
      <Navbar />

      <div
        className="registerdon"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="regdonbox"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <section className="leftdonreg">
            <img
              src={img1}
              alt="login picture"
              width="400px"
              style={{ marginRight: "100px" }}
            />
          </section>
          {/* <div className="d-flex" style={{ height: '600px' }}>
                        <div className="vr"></div>
                    </div> */}
          <section className="">
            <h1>Donate Things</h1>
            <br></br>
            
            <div className="fields">
              <label> Thing Name:</label>
              <input
                type="text"
                name="thingName"
                value={donationInfo.thingName}
                placeholder="Enter Thing Name"
                onChange={handleChange}
              ></input>
            </div>
            <div className="fields">
                                   <label htmlFor="file"> Choose Images: </label>
                                   <input type="file" filename="Images" style={{ width: '250px' }} onChange={(e) => { onImagesChange(e.target.files[0]) }}></input>
                              </div>
            <div className="fields">
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={donationInfo.quantity}
                placeholder="Enter quantity"
                onChange={handleChange}
              ></input>
            </div>
           

            <div
              className="btn btn-outline-primary btn-lg"
              onClick={registerDonation}
            >
              Donate
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ThingRegister;
