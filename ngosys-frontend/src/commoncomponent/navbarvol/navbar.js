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
        <div className="mainheadervolnav">
            <nav>
                <a onClick={() => history.push("/homepage")} className="navLink">Home</a>
                <a onClick={() => history.push("/registeredevents")} className="navLink">Registered Events</a>
                <a onClick={() => history.push("/updatevol")} className="navLink">Update Profile </a>
                <button className="navLink" onClick={logout} style={{backgroundColor: 'black', border: '0'}}>Logout</button>
            </nav>
        </div>
    )
}
export default Navbar