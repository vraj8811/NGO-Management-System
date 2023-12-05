/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useReducer } from "react";
import "./donatethings.css";
import { useHistory } from "react-router-dom";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../firstpage//images/output-onlinepngtools.png";

import "antd/dist/antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../commoncomponent/footer/footer2/footer2";


const Donatethings = () => {

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
  const handleSubmit=async(ngo)=>{
      localStorage.setItem('ngoID',ngo._id);
      history.push("/thingregister");
  }

  return (
    <div className="donatemoney">

      <div className="mainheaderdon">
        <div className="logo">
          <a href="/"><img src={img1} alt="logo"></img></a>
        </div>

        <nav>
          <a href="/homepagedonor">Home</a>
          <a onClick={() => history.push("/updatedon")} style={{ cursor: "pointer" }}>Update Profile </a>
          <a onClick={() => history.push("/viewtrans")} style={{ cursor: "pointer" }}>View Transections </a>
          <a onClick={() => history.push("/donationSuccess")} style={{ cursor: "pointer" }}>Donations </a>
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
                    
                    <td rowSpan={3}>
                    <button className="btn btn-primary" onClick={()=>{handleSubmit(ngo)}}>Donate</button></td>
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

export default Donatethings
