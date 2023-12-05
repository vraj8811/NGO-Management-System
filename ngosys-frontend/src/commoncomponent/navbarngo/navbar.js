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


        <div className="mainheaderngo">
            <nav>
                <a onClick={() => history.push("/homepagengo")} className="navLink">Home</a>
                <a onClick={() => history.push("/addevents")} className="navLink">Add Event</a>
                <a onClick={() => history.push("/transection")} className="navLink">Fund Donation</a>
                <a onClick={() => history.push("/updatengo")} className="navLink">Update Profile</a>
                <button className="navLink" onClick={logout} style={{background: 'none', border: '0'}}>Logout</button>
            </nav>
        </div>

    )
}

export default Navbar