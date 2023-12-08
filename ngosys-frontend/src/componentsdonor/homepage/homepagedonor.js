import React, { useState, useEffect, useReducer } from "react";
import "./homepagedonor.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../firstpage//images/output-onlinepngtools.png";
import "antd/dist/antd"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../commoncomponent/navbardon/navbar";


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
                <Navbar/>
                <div className="container my-5 p-3">
                    <h5 className="headingDon">Your generosity has the power to transform lives, turning dreams into reality and creating a brighter future for those in need. Thank you for being the catalyst for positive change and making a lasting impact through your support.</h5>
                    <div style={{display:'flex', justifyContent: 'center'}}>
                        <button id="dbtn" onClick={() => history.push("/donatemoney")}> Donate Money</button>
                        <button id="dbtn" onClick={() => history.push("/donatethings")}> Donate Things</button>
                    </div>
                </div>
        </div>

    )
}

export default Homepagedonor