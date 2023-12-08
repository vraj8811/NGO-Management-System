import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "antd/dist/antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../viewtrans/viewtrans.css";
import Navbar from "../../commoncomponent/navbardon/navbar";


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
    <div className="mainVTDiv">
    <Navbar/>
      <div className="container ngodata px-5 my-5">
        <h1 style={{fontWeight: 'bold', marginBottom: '1.5%', paddingTop: '2%'}}>Things Donated</h1>
        {thingsdata.length === 0 ? (
          <h5 style={{textAlign: 'center', paddingBottom: '2%'}}>No donation till now.</h5>
        ) : (
        <table className="table" style={{textAlign: "center"}}>
            <thead className="table-dark">
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>NGO Name</th>
                <th>NGO Email</th>
                <th>NGO Contact no.</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Approval Status</th>
                <th>Pick Up Status</th>
              </tr>
            </thead>
            <tbody>
            {thingsdata.map((trans, index) => (
                <tr key={trans._id}>
                  <td>{index + 1}</td>
                  <td>{trans.thingName}</td>
                  <td>{trans.ngoID.name}</td>
                  <td>{trans.ngoID.email}</td>
                  <td>{trans.ngoID.pnumber}</td>
                  <td>
                    {
                      <img
                        src={trans.images}
                        style={{ height: "100px", width: "100px" }}
                        alt={trans.images}
                      ></img>
                    }
                  </td>
                  <td>{trans.quantity}</td>
                  <td style={{width: '20%'}}> {trans.status == "0"
                              ? <p style={{marginLeft: "4%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-warning">Pending</p>
                              : trans.status == "1"
                              ? <p style={{marginLeft: "4%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-success">Accepted</p>
                              : <p style={{marginLeft: "4%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-danger">Rejected</p>
                          }
                  </td>
                  <td>
                    {
                      <table>
                        <tr>
                          <td style={{width: '30%'}}>
                          {trans.pick == "0" ? <p style={{marginLeft: "4%", fontWeight: "bold", fontSize: "17px", marginTop: "0%", marginBottom: "0.50%"}} className="text-warning">Not Picked Up</p> : <p style={{marginLeft: "2%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-success">Picked Up</p>}
                          </td>
                        </tr>
                          {trans.status == "1" && trans.pick == "0" ?( 
                        <tr>
                          <td style={{width: '30%'}}>
                            <button
                              className="btn-success"
                              style={{ marginTop: "0%", marginBottom: "10%", padding: "1% 2.65%", borderRadius: '2%', width: '100%', border: '2px solid green', color: "white"}}
                              onClick={() => handleAccept(trans._id)}
                            >
                              Mark As Picked Up
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
