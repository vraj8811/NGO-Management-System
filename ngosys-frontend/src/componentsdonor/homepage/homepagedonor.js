import React, { useState, useEffect, useReducer } from "react";
import "./homepagedonor.css";
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


// const { Meta } = Card;

const Homepagedonor = () => {

    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("currentUser"));

    //logout button
    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/")
    }

    return (
        <div className="homepagedonor">

            <div class="mainheaderdon">
                <div class="logo">
                <a href="/"><img src={img1} alt="logo"></img></a>
                </div>

                <nav>
                    <a href="/homepagedonor">Home</a>
                    {/* <a href="/contactus">Contact</a> */}
                    <a onClick={() => history.push("/updatedon")} style={{ cursor: "pointer" }}>Update Profile </a>
                    <a onClick={() => history.push("/viewtrans")} style={{ cursor: "pointer" }}>View Transections </a>
                    <a onClick={() => history.push("/donationSuccess")} style={{ cursor: "pointer" }}>Donations </a>
                    {/* <a style={{ cursor: 'pointer' }} onClick={() => history.push("/registeredevents")} >Registered Events</a> */}
                    <button className="btn btn-outline-danger " onClick={logout}>Logout</button>

                </nav>
            </div>

            <br></br><br></br>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>Hello {user.user.firstname} {user.user.lastname} !!!</h1>
            <br></br><br></br>

            <div className="extrabutton" align="center">
                <button onClick={() => history.push("/donatemoney")} style={{color:'#020049'}}> Donate Money</button>
                <button onClick={() => history.push("/donatethings")} style={{color:'#020049'}}> Donate Things</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        
        
        </div>

    )
}

export default Homepagedonor