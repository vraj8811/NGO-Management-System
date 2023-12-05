import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import img1 from "../../firstpage/images/output-onlinepngtools.png";
import Footer from "../../commoncomponent/footer/footer2/footer2";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navbar from '../../commoncomponent/navbarngo/navbar';


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
    <div>
      <div class="mainheadervol">
        <div class="logo">
          <a href="/">
            <img src={img1} alt="logo"></img>
          </a>
        </div>

        <Navbar/>
      </div>

      <div className="container">
        <br></br>
        <h1 align="center">All Donations</h1>
        {transList.length === 0 ? (
          <p>No Doanation History available</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Donor Name</th>
                <th>Donor Address</th>
                <th>Donor Phone Num.</th>
                <th>Donor Email</th>
                <th>Things Name</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Status</th>
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
                        style={{ height: "100px" }}
                        alt={trans.images}
                      ></img>
                    }
                  </td>
                  <td>
                    {
                      <table>
                        <tr>
                          <td colSpan={2}>
                            {trans.status == "0"
                              ? "Panding"
                              : trans.status == "1"
                              ? "Accepted"
                              : "Rejected"}
                          </td>
                        </tr>
                          {trans.status == "0"?( <tr>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              style={{ marginRight: "3px" }}
                              onClick={() => handelaccept(trans._id)}
                            >
                              Accepts
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handelreject(trans._id)}
                            >
                              Reject
                            </button>
                          </td>
                        </tr> ): " "}
                       
                      </table>
                    }
                  </td>
                  <td>{trans.pick == "0" ? "Not Pickedup" : "Pickdup"}</td>
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
