import React from "react";
import "./navbar.css" 
import img1 from "../firstpage/images/output-onlinepngtools.png";
import { useHistory } from "react-router-dom";



const Navbar =() =>
{
    const history=useHistory();
    return(
        
          
        <section className="mainheader">
            <div className="logo">
                    <img src={img1} alt="logo"></img>
            </div>
        
        <nav>
            <a onClick={() => history.push("/")} style={{cursor:'pointer'}}>Home</a>
            <a href="/help">help</a>
            <a href="/contactus">Contact</a>
            
        </nav>
        </section>

)
}

export default Navbar