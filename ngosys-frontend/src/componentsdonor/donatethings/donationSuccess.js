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


const DonationSuccess = () => {

  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [thingsdata, setThingsdata] = useState([]);

  //logout button
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRegUser");
    history.push("/")
  }

  useEffect(() => {
    fetchAllThings(user.user._id);
  }, []);

  const fetchAllThings = async (id) => {
    try {
      const response = await fetch(`http://localhost:9002/getallthings/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data)
      setThingsdata(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAccept=async(id)=>{
    const thingId = id;
    const newPick = '1'; // Set the new status value

    await fetch(`http://localhost:9002/things/${thingId}/updatePick`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPick }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated pick:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      fetchAllThings(user.user._id);
    
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
          <a style={{ cursor: 'pointer' }} onClick={() => history.push("/donationSuccess")} >Donation </a>
          <button className="btn btn-outline-danger " onClick={logout}>Logout</button>

        </nav>
      </div>

      <div className="ngodata" align="center" >
        <br></br>
        <h1 align="center">All Donations</h1>
        {thingsdata.length === 0 ? (
          <p>No Doanation History available</p>
        ) : (
        <table className="table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Image</th>
                <th>Things Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Pickup Status</th>
              </tr>
            </thead>
            <tbody>
            {thingsdata.map((trans, index) => (
                <tr key={trans._id}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      <img
                        src={trans.images}
                        style={{ height: "100px" }}
                        alt={trans.images}
                      ></img>
                    }
                  </td>
                  <td>{trans.thingName}</td>
                  <td>{trans.quantity}</td>
                  <td> {trans.status == "0"
                              ? "Panding"
                              : trans.status == "1"
                              ? "Accepted"
                              : "Disabled"}
                  </td>
                  <td>
                    {
                      <table>
                        <tr>
                          <td>
                          {trans.pick == "0" ? "Not Pickedup" : "Pickdup"}
                          </td>
                        </tr>
                          {trans.status == "1" && trans.pick == "0" ?( <tr>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              style={{ marginRight: "3px" }}
                              onClick={() => handleAccept(trans._id)}
                            >
                              Marked as Picked Up
                            </button>
                          </td>
                        </tr> ): " "}
                       
                      </table>
                    }
                  </td>
                 
                </tr>
              ))}
            </tbody>
            </table>
        )
        }
      </div>

    </div>
  )
}

export default DonationSuccess
