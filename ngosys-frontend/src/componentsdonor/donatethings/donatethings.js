import React, { useState, useEffect, useReducer } from "react";
import "../donatemoney/donatemoney.css";
import { useHistory } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../commoncomponent/navbardon/navbar";


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
                    <button className="btn mx-0" onClick={()=>{handleSubmit(ngo)}} style={{marginTop: '2%'}}>Donate</button>
                  </div>
            </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Donatethings
