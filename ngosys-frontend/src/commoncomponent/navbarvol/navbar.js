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
        <div className="mainheader">
            <nav>
                <a onClick={() => history.push("/homepage")}>Home</a>
                <a onClick={() => history.push("/registeredevents")} >Registered Events</a>
                <a onClick={() => history.push("/updatevol")}>Update Profile </a>
                <button className="navLink" onClick={logout}>Logout</button>
            </nav>
        </div>
    )
}
export default Navbar