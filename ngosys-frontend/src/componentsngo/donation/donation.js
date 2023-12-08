import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from '../../commoncomponent/navbarngo/navbar';
import "./donation.css"


const Doantion = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const history = useHistory();
  const [transList, setTransList] = useState([]);
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentRegUser");
    history.push("/");
  };

  useEffect(() => {
    fetchAllTrans(user.user._id);
  }, []);

  const fetchAllTrans = async (transid) => {
    try {
      const response = await fetch(
        `http://localhost:9002/doantions/${transid}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setTransList(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handelaccept = async (id) => {
    const thingId = id;
    const newStatus = '1'; // Set the new status value

    await fetch(`http://localhost:9002/updatestatus/${thingId}/updateStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated Thing:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      fetchAllTrans(user.user._id);
  };

  const handelreject = async (id) => {
    const thingId = id;
    const newStatus = '2'; // Set the new status value

    await fetch(`http://localhost:9002/updatestatus/${thingId}/updateStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated Thing:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      fetchAllTrans(user.user._id);
  };

  return (
    <div className="mainDivCTN">
        <Navbar/>
      <div className="container my-4 px-3 py-3">
        <h1 style={{fontWeight: 'bold', marginBottom: '1.5%', marginTop: '0%'}}>Things Donated</h1>
        {transList.length === 0 ? (
          <h5 style={{textAlign: 'center'}}>No one has donated till now.</h5>
        ) : (
          <table className="table" style={{textAlign: 'center'}}>
            <thead className="table-dark">
              <tr>
                <th>Index</th>
                <th>Donor Name</th>
                <th>Donor Address</th>
                <th>Donor Contact No.</th>
                <th>Donor Email</th>
                <th>Thing</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Approval Status</th>
                <th>Pickup Status</th>
              </tr>
            </thead>
            <tbody>
              {transList.map((trans, index) => (
                <tr key={trans._id}>
                  <td>{index + 1}</td>
                  <td>{trans.donorID.firstname +" "+trans.donorID.lastname }</td>
                  <td>{trans.donorID.address}</td>
                  <td>{trans.donorID.pnumber}</td>
                  <td>{trans.donorID.email}</td>
                  <td>{trans.thingName}</td>
                  <td>{trans.quantity}</td>
                  <td>
                    {
                      <img
                        src={trans.images}
                        style={{ height: "100px", width: '100px'}}
                        alt={trans.images}
                      ></img>
                    }
                  </td>
                  <td>
                    {
                      <table>
                        <tr>
                          <td colSpan={3} style={{width: '20%'}}>
                            {trans.status == "0"
                              ? <p style={{marginBottom: "0%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-warning">Pending</p>
                              : trans.status == "1"
                              ? <p style={{marginBottom: "0%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-success">Accepted</p>
                              : <p style={{marginBottom: "0%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-danger">Rejected</p>}
                          </td>
                        </tr>
                          {trans.status == "0"?( <tr>
                          <td style={{width: '20%'}}>
                            <button
                              className="btn-outline-success text-success"
                              style={{ marginTop: "5%", marginBottom: "10%", padding: "3% 4%", borderRadius: '10%', width: '70%', border: '2px solid green', background: 'none'}}
                              onClick={() => handelaccept(trans._id)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn-outline-danger text-danger"
                              style={{ marginBottom: "10%", padding: "3% 4%", borderRadius: '10%', width: '70%', border: '2px solid red', background: 'none'}}
                              onClick={() => handelreject(trans._id)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr> ): " "}
                       
                      </table>
                    }
                  </td>
                  <td style={{width: '12%'}}>
                          {trans.pick == "0" ? <p style={{marginLeft: "4%", fontWeight: "bold", fontSize: "17px", marginTop: "0%", marginBottom: "0.50%"}} className="text-warning">Not Picked Up</p> : <p style={{marginLeft: "2%", fontWeight: "bold", fontSize: "17px", marginTop: "0%"}} className="text-success">Picked Up</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Doantion;
