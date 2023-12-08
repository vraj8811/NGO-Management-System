/*eslint-disable-next-line*/

import React, { useState } from "react";
import "./thingregister.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../../commoncomponent/navbardon/navbar";
import img1 from "../../firstpage/images/logart.png";
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
      <div className="registerdonthing">
      <Navbar />
          <div className="regThingBox">
            <h1 className="headerT">Donate Things</h1>
              <div className="fieldsT">
                <label className="labelT">Name:</label>
                <input
                  type="text"
                  name="thingName"
                  value={donationInfo.thingName}
                  placeholder="Enter Name"
                  onChange={handleChange}
                  className="inputT"
                ></input>
              </div>
            <div className="fieldsT">
                <label htmlFor="file" className="labelT"> Choose Image: </label>
                <input type="file" filename="Images" onChange={(e) => { onImagesChange(e.target.files[0]) }} className="inputT"></input>
            </div>
            <div className="fieldsT">
              <label className="labelT">Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={donationInfo.quantity}
                placeholder="Enter Quantity"
                onChange={handleChange}
                className="inputT"
              ></input>
            </div>
            <div className="btn" onClick={registerDonation} style={{width: '35%', marginTop: '2%'}}>Donate</div>
          </div>
      </div>
    </>
  );
};

export default ThingRegister;
