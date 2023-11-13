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

const Donatemoney = () => {

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [ngodata, setNgodata] = useState([]);

  //logout button
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRegUser");
    history.push("/logindon")
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

  return (
    <div className="donatemoney">

      <div className="mainheaderdon">
        <div className="logo">
          <a href="/"><img src={img1} alt="logo"></img></a>
        </div>

        <nav>
          <a href="/homepagedonor">Home</a>
          <a href="/contactus">Contact</a>
          <a onClick={() => history.push("/updatedon")} style={{ cursor: "pointer" }}>Update Profile </a>
          {/* <a style={{ cursor: 'pointer' }} onClick={() => history.push("/registeredevents")} >Registered Events</a> */}
          <button className="btn btn-outline-danger " onClick={logout}>Logout</button>

        </nav>
      </div>

      <div className="ngodata" align="center" >
        <br></br>
        {ngodata.map(ngo => (
          <>
          <div key={ngo._id} className="card" style={{width:"800px"}}>
            <div className="card-body">
              <table style={{border:2,width:"500px"}}>
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
                  <td rowSpan={3}><button className="btn btn-primary">Donate</button></td>
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

      <div>
        <Footer />
      </div>

    </div>
  )
}

export default Donatemoney
