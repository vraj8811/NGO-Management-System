import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";
import img1 from "../../firstpage/images/output-onlinepngtools.png"
import Footer from "../../commoncomponent/footer/footer2/footer2";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Transection = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const history = useHistory();
    const [transList, setTransList] = useState([]);
    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/")
    }

    useEffect(() => {
        fetchAllTrans(user.user._id);
      }, []);

      const fetchAllTrans = async (transid) => {
        try {
          const response = await fetch(`http://localhost:9002/transactions/${transid}`, {
            method: 'GET'
          });
          const data = await response.json();
          setTransList(data);
        } catch (error) {
          console.error(error.message);
        }
      };




    return (
        <div>
            <div class="mainheadervol">
                <div class="logo">
                    <a href="/"><img src={img1} alt="logo"></img></a>
                </div>

                <nav>
                    <a href="/homepagengo">Home</a>
                    {/* <a href="/contactus">Contact</a> */}
                    <a onClick={() => history.push("/transection")} style={{ cursor: "pointer" }}>Transection</a>
                    <a onClick={() => history.push("/updatengo")} style={{ cursor: "pointer" }}>Update Profile</a>
                    <a onClick={() => history.push("/addevents")} style={{ cursor: "pointer" }}>Add Event</a>
                    <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </nav>
            </div>

            <div className="container">
              <br></br>
                <h1 align="center">All Transections</h1>
                {transList.length === 0 ? (
                    <p>No Transection History available</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Donor Name</th>
                                <th>Donor Email</th>
                                <th>Donor Phone Number</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Transection ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transList.map((trans,index) => (
                                <tr key={trans._id}>
                                    <td>{index+1}</td>
                                    <td>{trans.donorid.firstname + ' ' + trans.donorid.lastname}</td>
                                    <td>{trans.donorid.email}</td>
                                    <td>{trans.donorid.pnumber}</td>
                                    <td>{moment(trans.date).format('LL')}</td>
                                    <td>{trans.amount}</td>
                                    <td>{trans.razorpayPaymentId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Transection
