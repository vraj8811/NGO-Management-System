import React from "react";
import "./navbar.css"
import img1 from "../../firstpage/images/output-onlinepngtools.png";
import { useHistory } from "react-router-dom";



const Navbar = () => {
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/")
    }

    return (


        <div className="mainheaderdon">
            <nav>
                    <a href="/homepagedonor" className="navLink">Home</a>
                    <a onClick={() => history.push("/viewtrans")} className="navLink">Money Donation</a>
                    <a onClick={() => history.push("/donationSuccess")} className="navLink">Thing Donation</a>
                    <a onClick={() => history.push("/updatedon")} className="navLink">Update Profile </a>
                    <button className="navLink" onClick={logout} style={{backgroundColor: 'black', border: '0'}}>Logout</button>
            </nav>
        </div>

    )
}

export default Navbar