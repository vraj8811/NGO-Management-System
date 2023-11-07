import React from "react";
import "./navbar.css"
import img1 from "../../firstpage/images/output-onlinepngtools.png";
import { useHistory } from "react-router-dom";



const Navbar = () => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentRegUser");
        history.push("/loginngo")
    }

    return (


        <section className="mainheaderVOL">
            <div className="logo">
                <img src={img1} alt="logo"></img>
            </div>

            <nav>
                <a onClick={() => history.push("/homepagengo")} style={{ cursor: 'pointer' }}>Home</a>
                <a href="/contactus">Contact</a>
                <a onClick={() => history.push("/updatengo")} style={{ cursor: "pointer" }}>Update Profile</a>
                <a onClick={() => history.push("/addevents")} style={{ cursor: "pointer" }}>Add Event</a>
                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>

            </nav>
        </section>

    )
}

export default Navbar